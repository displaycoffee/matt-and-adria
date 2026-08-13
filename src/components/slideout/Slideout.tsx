/* Styles */
import './styles/slideout.scss';

/* Packages */
import { RefObject, useEffect, useRef } from 'react';

/* Scripts */
import { useFormattedId } from '../../_config/scripts/hooks';
import { useAppContext } from '../../context/scripts/context-hooks';
import { SlideoutOverlayProps, SlideoutProps } from './scripts/slideout-types';
import { slideout } from './scripts/slideout';

/* Components */
import { Icon } from '../icons/Icons';

export const Slideout = (props: SlideoutProps) => {
	const { children, options } = props;
	const { config, get, toggle } = slideout;
	const fallbackId = useFormattedId();
	const id = `slideout-${options?.id ?? fallbackId}`;
	const title = `${id}-title`;

	// Get default attributes for slideout
	const width = options?.width ?? config.values.width;
	const direction = options?.direction ?? config.values.direction;
	const orientation = slideout.get.orientation(direction);
	const styles = get.styles(direction, width);

	// Create shared slideout button
	const slideoutButton = (
		<button className="slideout-button unstyled pointer" type="button" onClick={(e) => toggle(e, id)}>
			<Icon id={'heart'} size={'large'} />
			{options.label}
		</button>
	);

	// Set button properties
	const button = typeof options?.button === 'object' ? options.button : { outside: false, show: true };

	return button.outside && button.show ? (
		slideoutButton
	) : (
		<div
			id={id}
			className={`${config.classes.slideout} slideout-${orientation} slideout-${direction}`}
			data-width={width}
			data-direction={direction}
		>
			{!button.outside && button.show ? slideoutButton : null}

			<div className={config.classes.content} style={styles} inert role="dialog" aria-modal="true" aria-labelledby={title}>
				<header className="slideout-header flex-nowrap flex-align-items-center">
					<h2 id={title} className="slideout-title h-text">
						{options.label}
					</h2>

					<button
						className="slideout-close pointer unstyled"
						type="button"
						aria-label="Slideout Close Button"
						onClick={(e) => toggle(e, false)}
					>
						<Icon id={'close-thin'} />
					</button>
				</header>

				<div className="slideout-border"></div>

				<div className="slideout-scrollbar scrollbar">
					<div
						className="slideout-body"
						onClick={(e) => {
							const eventElement = e.target as HTMLElement;

							// Close slideout content if inner nav button is clicked on
							if (eventElement) {
								const elementName = eventElement?.nodeName?.toLowerCase() ?? '';
								if (elementName === 'a' || (elementName === 'button' && eventElement.classList.contains('a'))) {
									setTimeout(() => {
										toggle(e, false);
									});
								}
							}
						}}
						role="presentation"
					>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export const SlideoutOverlay = (props: SlideoutOverlayProps) => {
	const { options } = props;
	const { utils } = useAppContext();
	const { config, set, toggle } = slideout;
	const elementRef: RefObject<HTMLDivElement | null> = useRef(null);

	// Create overlay element and append to body on mount, remove on unmount
	useEffect(() => {
		const slideoutTarget = document.querySelector('body');
		if (!slideoutTarget) return;

		const overlay = document.createElement('div');

		// Set attributes
		utils.setAttributes(overlay, {
			class: 'slideout-overlay pointer',
			role: 'presentation',
		});

		// Add onclick
		overlay.onclick = (e) => toggle(e, false);

		// Set children and ref
		slideoutTarget.appendChild(overlay);
		elementRef.current = overlay;

		return () => {
			overlay.remove();
			elementRef.current = null;
		};
	}, [utils, toggle]);

	// If we are on desktop and a slideout is active, fully close it (content state, focus trap, focus restore, overlay)
	useEffect(() => {
		if (!options.isDesktop) return;

		const activeSelector = `.${config.classes.slideout}.${config.classes.active}`;
		const activeElements = document.querySelectorAll<HTMLElement>(activeSelector);

		activeElements.forEach((element) => {
			set.slideout(element, 'remove');
		});

		set.body('remove');
	}, [config, options.isDesktop, set]);

	// Close active slideout(s) when escape is pressed
	// Note: set.slideout already restores focus to whatever opened the content
	useEffect(() => {
		const activeSelector = `.${config.classes.slideout}.${config.classes.active}`;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key !== 'Escape') return;
			if (document.querySelectorAll(activeSelector).length === 0) return;
			toggle(e, false);
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [config, toggle]);

	return null;
};
