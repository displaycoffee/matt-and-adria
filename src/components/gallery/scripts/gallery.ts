/* Packages */
import { CSSProperties } from 'react';

// Selector for elements that can receive focus, used to trap Tab within an open gallery
const focusableSelector =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Track the element that opened each gallery, so focus can be restored to it on close
const openerElements = new WeakMap<HTMLElement, HTMLElement>();

// Track each galleries Tab-trap handler, so it can be removed again on close
const trapHandlers = new WeakMap<HTMLElement, (e: KeyboardEvent) => void>();

// Exclude elements matched by focusableSelector that are hidden (e.g. a collapsed dropdown's content)
// and therefore not actually reachable via Tab, even though they match the selector
const isVisible = (el: HTMLElement) => {
	const style = getComputedStyle(el);
	return style.visibility !== 'hidden' && style.display !== 'none';
};

// Keep Tab / Shift + Tab cycling within the gallery while it's open
const trapFocus = (overlay: HTMLElement, e: KeyboardEvent) => {
	if (e.key !== 'Tab') return;

	const focusable = Array.from(overlay.querySelectorAll<HTMLElement>(focusableSelector)).filter(isVisible);
	if (focusable.length === 0) return;

	const first = focusable[0];
	const last = focusable[focusable.length - 1];

	if (e.shiftKey && document.activeElement === first) {
		e.preventDefault();
		last.focus();
	} else if (!e.shiftKey && document.activeElement === last) {
		e.preventDefault();
		first.focus();
	}
};

export const gallery = {
	config: {
		classes: {
			// Class variables for component
			activeBody: 'gallery-active-body',
			active: 'gallery-active',
			overlay: 'gallery-overlay',
			gallery: 'gallery',
		},
		values: {
			// Default values if props are not defined
			direction: 'left',
		},
	},
	get: {
		orientation: (direction: string) => {
			// Get orientation of gallery overlay
			return direction === 'top' || direction === 'bottom' ? 'vertical' : 'horizontal';
		},
		styles: (direction: string, isActive?: boolean) => {
			// Set styles for gallery
			const orientation = gallery.get.orientation(direction);
			const transform = orientation === 'vertical' ? 'translateY' : 'translateX';
			const value = `${direction == 'top' || direction == 'left' ? '-' : ''}150%`;

			// Create styles
			const styles: CSSProperties = {
				transform: `${transform}(${isActive ? 0 : value})`,
			};

			return styles;
		},
	},
	set: {
		body: (state: string) => {
			// Toggle gallery body class
			const classes = gallery.config.classes;
			const body = document.querySelector('body');
			if (body) {
				if (state === 'add') {
					body.classList.add(classes.activeBody);
				} else {
					body.classList.remove(classes.activeBody);
				}
			}
		},
		gallery: (overlay: HTMLElement, state: string) => {
			// Helper function to toggle gallery properties
			const { config, get } = gallery;
			const { classes } = config;

			if (overlay && overlay?.dataset) {
				// Get data attributes
				const direction = overlay.dataset.direction as string;

				// Update elements depending on state
				if (state === 'add') {
					overlay.classList.add(classes.active);
					Object.assign(overlay.style, get.styles(direction, true));
					overlay.inert = false;

					// Remember what had focus so it can be restored on close, then move focus into the overlay
					const opener = document.activeElement as HTMLElement | null;
					if (opener) openerElements.set(overlay, opener);
					overlay.querySelector<HTMLElement>('.gallery-close')?.focus();

					// Trap Tab/Shift+Tab within the overlay while it's open
					const handleTrap = (e: KeyboardEvent) => trapFocus(overlay, e);
					trapHandlers.set(overlay, handleTrap);
					overlay.addEventListener('keydown', handleTrap);
				} else {
					overlay.classList.remove(classes.active);
					Object.assign(overlay.style, get.styles(direction));
					overlay.inert = true;

					// Remove the Tab trap and restore focus to whatever opened the overlay
					const handleTrap = trapHandlers.get(overlay);
					if (handleTrap) {
						overlay.removeEventListener('keydown', handleTrap);
						trapHandlers.delete(overlay);
					}
					openerElements.get(overlay)?.focus();
					openerElements.delete(overlay);
				}
			}
		},
	},
	toggle: (e: EventsType, id: string | boolean) => {
		e.preventDefault();
		const { config, set } = gallery;
		const classes = config.classes;
		const activeSelector = `.${classes.overlay}.${classes.active}`;

		// Reset active gallery
		document.querySelectorAll(activeSelector).forEach((active) => {
			const element = active as HTMLElement;
			set.gallery(element, 'remove');
		});

		// Perform actions for current gallery
		if (id) {
			const element = document.querySelector(`#${id}`) as HTMLElement;
			const elementState = !element.classList.contains(classes.active) ? 'add' : 'remove';
			set.gallery(element, elementState);
		}

		// Reset body classes
		// Note: using a slight timeout to ensure gallery actions have processed
		setTimeout(() => {
			const galleryActiveElements = document.querySelectorAll(activeSelector);
			const bodyState = galleryActiveElements.length !== 0 ? 'add' : 'remove';
			set.body(bodyState);
		}, 100);
	},
};
