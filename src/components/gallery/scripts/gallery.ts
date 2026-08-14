/* Packages */
import { CSSProperties } from 'react';

/* Scripts */
import { utils } from '../../../_config/scripts/utils';

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
			direction: 'top',
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
		thumbnail: (image: string) => {
			// Get thumbnail path for a gallery image (see generate-thumbnails.js)
			return image.replace(/(\.[a-zA-Z0-9]+)$/, '-thumb$1');
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
					// Add classes and styles and remove inert attribute
					overlay.classList.add(classes.active);
					Object.assign(overlay.style, get.styles(direction, true));
					overlay.inert = false;
					utils.focusTrap.activate(overlay, '.gallery-close');
				} else {
					// Remove classes and styles and addd inert attribute
					overlay.classList.remove(classes.active);
					Object.assign(overlay.style, get.styles(direction));
					overlay.inert = true;
					utils.focusTrap.deactivate(overlay);
				}
			}
		},
	},
	toggle: (e: EventsType, id: string | boolean) => {
		// Note: e.g. a touchend fired mid-scroll can be non-cancelable, so guard against that
		if (e.cancelable) e.preventDefault();
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
			const element = document.querySelector<HTMLElement>(`#${id}`);
			if (element) {
				const elementState = !element.classList.contains(classes.active) ? 'add' : 'remove';
				set.gallery(element, elementState);
			}
		}

		// Reset body classes
		// Note: classList changes above are synchronous, so the active count is already up to date here
		const galleryActiveElements = document.querySelectorAll(activeSelector);
		const bodyState = galleryActiveElements.length !== 0 ? 'add' : 'remove';
		set.body(bodyState);
	},
};
