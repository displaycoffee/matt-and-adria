/* Packages */
import { CSSProperties } from 'react';

// Selector for elements that can receive focus, used to trap Tab within an open slideout
const focusableSelector =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Track the element that opened each slideout, so focus can be restored to it on close
const openerElements = new WeakMap<HTMLElement, HTMLElement>();

// Track each slideout's Tab-trap handler, so it can be removed again on close
const trapHandlers = new WeakMap<HTMLElement, (e: KeyboardEvent) => void>();

// Exclude elements matched by focusableSelector that are hidden (e.g. a collapsed dropdown's content)
// and therefore not actually reachable via Tab, even though they match the selector
const isVisible = (el: HTMLElement) => {
	const style = getComputedStyle(el);
	return style.visibility !== 'hidden' && style.display !== 'none';
};

// Keep Tab / Shift + Tab cycling within the slideout content while it's open
const trapFocus = (content: HTMLElement, e: KeyboardEvent) => {
	if (e.key !== 'Tab') return;

	const focusable = Array.from(content.querySelectorAll<HTMLElement>(focusableSelector)).filter(isVisible);
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

export const slideout = {
	config: {
		classes: {
			// Class variables for component
			activeBody: 'slideout-active-body',
			active: 'slideout-active',
			overlay: 'slideout-overlay',
			slideout: 'slideout',
			content: 'slideout-content',
		},
		values: {
			// Default values if props are not defined
			width: '350px',
			direction: 'left',
		},
	},
	get: {
		orientation: (direction: string) => {
			// Get orientation of slideout
			return direction === 'top' || direction === 'bottom' ? 'vertical' : 'horizontal';
		},
		styles: (direction: string, width: string, isActive?: boolean) => {
			// Set styles for gallery
			const orientation = slideout.get.orientation(direction);
			const transform = orientation === 'vertical' ? 'translateY' : 'translateX';
			const value = `${direction == 'top' || direction == 'left' ? '-' : ''}150%`;

			// Create styles
			const styles: CSSProperties = {
				transform: `${transform}(${isActive ? 0 : value})`,
				width: width,
			};

			// If horizontal slideout, adjust direction value
			if (orientation == 'horizontal') {
				const directionProperty = direction == 'left' ? 'right' : 'left';
				styles[directionProperty] = 'auto';
			}

			return styles;
		},
	},
	set: {
		body: (state: string) => {
			// Toggle slideout body class
			const classes = slideout.config.classes;
			const body = document.querySelector('body');
			if (body) {
				if (state === 'add') {
					body.classList.add(classes.activeBody);
				} else {
					body.classList.remove(classes.activeBody);
				}
			}
		},
		slideout: (element: HTMLElement, state: string) => {
			// Helper function to toggle slideout properties
			const { config, get } = slideout;
			const { classes } = config;
			const content = element.querySelector(`.${classes.content}`) as HTMLElement;

			if (content && element?.dataset?.width && element?.dataset?.direction) {
				// Get data attributes
				const width = element.dataset.width;
				const direction = element.dataset.direction;

				// Update elements depending on state
				if (state === 'add') {
					element.classList.add(classes.active);
					Object.assign(content.style, get.styles(direction, width, true));
					content.inert = false;

					// Remember what had focus so it can be restored on close, then move focus into the content
					const opener = document.activeElement as HTMLElement | null;
					if (opener) openerElements.set(element, opener);
					content.querySelector<HTMLElement>('.slideout-close')?.focus();

					// Trap Tab/Shift+Tab within the content while it's open
					const handleTrap = (e: KeyboardEvent) => trapFocus(content, e);
					trapHandlers.set(content, handleTrap);
					content.addEventListener('keydown', handleTrap);
				} else {
					element.classList.remove(classes.active);
					Object.assign(content.style, get.styles(direction, width));
					content.inert = true;

					// Remove the Tab trap and restore focus to whatever opened the content
					const handleTrap = trapHandlers.get(content);
					if (handleTrap) {
						content.removeEventListener('keydown', handleTrap);
						trapHandlers.delete(content);
					}
					openerElements.get(element)?.focus();
					openerElements.delete(element);
				}
			}
		},
	},
	toggle: (e: EventsType, id: string | boolean) => {
		e.preventDefault();
		const { config, set } = slideout;
		const classes = config.classes;
		const activeSelector = `.${classes.slideout}.${classes.active}`;

		// Reset active slideout
		document.querySelectorAll(activeSelector).forEach((active) => {
			const element = active as HTMLElement;
			set.slideout(element, 'remove');
		});

		// Perform actions for current slideout
		if (id) {
			const element = document.querySelector(`#${id}`) as HTMLElement;
			const elementState = !element.classList.contains(classes.active) ? 'add' : 'remove';
			set.slideout(element, elementState);
		}

		// Reset body classes
		// Note: using a slight timeout to ensure slideout actions have processed
		setTimeout(() => {
			const slideoutActiveElements = document.querySelectorAll(activeSelector);
			const bodyState = slideoutActiveElements.length !== 0 ? 'add' : 'remove';
			set.body(bodyState);
		}, 100);
	},
};
