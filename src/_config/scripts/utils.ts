// Selector for elements that can receive focus, used by focusTrap to trap Tab within an open dialog-like container
const focusableSelector =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Track the element that opened each trapped container, so focus can be restored to it on close
const focusTrapOpenerElements = new WeakMap<HTMLElement, HTMLElement>();

// Track each container's Tab-trap handler, so it can be removed again on close
const focusTrapHandlers = new WeakMap<HTMLElement, (e: KeyboardEvent) => void>();

// Exclude elements matched by focusableSelector that are hidden (e.g. a collapsed dropdown's content)
// and therefore not actually reachable via Tab, even though they match the selector
const isFocusable = (el: HTMLElement) => {
	const style = getComputedStyle(el);
	return style.visibility !== 'hidden' && style.display !== 'none';
};

// Keep Tab / Shift + Tab cycling within the container while it's open
const trapFocus = (container: HTMLElement, e: KeyboardEvent) => {
	if (e.key !== 'Tab') return;

	const focusable = Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(isFocusable);
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

export const utils: UtilsType = {
	focusTrap: {
		// Remember what had focus, move focus into the container (or a specific element within it), and trap Tab/Shift+Tab
		activate: (container: HTMLElement, focusSelector?: string) => {
			const opener = document.activeElement as HTMLElement | null;
			if (opener) focusTrapOpenerElements.set(container, opener);

			const target = (focusSelector ? container.querySelector<HTMLElement>(focusSelector) : null) ?? container;
			target.focus();

			const handleTrap = (e: KeyboardEvent) => trapFocus(container, e);
			focusTrapHandlers.set(container, handleTrap);
			container.addEventListener('keydown', handleTrap);
		},
		// Remove the Tab trap and restore focus to whatever opened the container
		deactivate: (container: HTMLElement) => {
			const handleTrap = focusTrapHandlers.get(container);
			if (handleTrap) {
				container.removeEventListener('keydown', handleTrap);
				focusTrapHandlers.delete(container);
			}

			focusTrapOpenerElements.get(container)?.focus();
			focusTrapOpenerElements.delete(container);
		},
	},
	getLast: (value: string | string[], delimeter?: string) => {
		// Get last item in array
		let valueArray: string[] | number[] = [];
		if (Array.isArray(value)) {
			valueArray = value;
		} else if (delimeter) {
			valueArray = value.split(delimeter);
		}
		return valueArray[valueArray.length - 1] ?? '';
	},
	getPage: () => {
		// Get previous / parent page
		return window.location.pathname.split('/').slice(0, -1).join('/');
	},
	handleize: (value: string) => {
		// Format value for html classes
		return value
			.toLowerCase()
			.trim()
			.replace(/[^\w\s]/g, '')
			.replace(/\s/g, '-');
	},
	isSticky: (element: HTMLElement | null, stickyClass: string) => {
		if (element) {
			// Create options and callback for observer
			const stickyOptions = { threshold: [1] };
			const stickyCallback = (e: IntersectionObserverEntry) => {
				e.target.classList.toggle(stickyClass, e.intersectionRatio < 1);
			};

			// Observe to toggle sticky class
			const stickyObserver = new IntersectionObserver(([e]) => stickyCallback(e), stickyOptions);
			stickyObserver.observe(element);
		}
	},
	reveal: (element: HTMLElement | null, revealClass: string) => {
		if (element) {
			// Create options and callback for observer
			// Note: threshold is edge-triggered (fires as soon as the element appears, before its bottom
			// edge is 10% into the viewport) rather than area-ratio-based, so it works consistently for
			// sections much taller than the viewport, not just ones that can fit fully on screen
			// Note 2: rootMargin values need to be in pixels or precentage values
			const revealOptions = { threshold: 0, rootMargin: '0px 0px -10% 0px' };
			const revealCallback = (e: IntersectionObserverEntry, observer: IntersectionObserver) => {
				if (!e.isIntersecting) return;

				// Add class once revealed, no need to keep observing
				e.target.classList.add(revealClass);
				observer.unobserve(e.target);
			};

			// Observe to add class once element scrolls into view
			const revealObserver = new IntersectionObserver(([e], observer) => revealCallback(e, observer), revealOptions);
			revealObserver.observe(element);
		}
	},
	scrollTo: (e?: EventsType, selector?: string, offset?: number) => {
		// Scroll to element on page
		if (e) {
			e.preventDefault();
		}
		const anchor = {
			selector: selector ?? '',
			offset: offset ?? 0,
			position: () => {
				const anchorElement = anchor.selector ? document.querySelector(anchor.selector) : false;
				return anchorElement ? anchorElement.getBoundingClientRect().top + window.scrollY - anchor.offset : -anchor.offset;
			},
		};
		window.scroll({ top: anchor.position(), left: 0, behavior: 'smooth' });
	},
	setAttributes: (element: HTMLElement, attributes: ObjectStringType) => {
		// Set multiple attributes on an element
		for (const attribute in attributes) {
			element.setAttribute(attribute, attributes[attribute]);
		}
	},
};
