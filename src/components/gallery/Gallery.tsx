/* Styles */
import './styles/gallery.scss';

/* Packages */
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/* Scripts */
import { useFormattedId } from '../../_config/scripts/hooks';
import { useAppContext } from '../../context/scripts/context-hooks';
import { GalleryOverlayProps, GalleryProps } from './scripts/gallery-types';
import { gallery } from './scripts/gallery';

/* Components */
import { Icon } from '../icons/Icons';
import { Image } from '../image/Image';

export const Gallery = (props: GalleryProps) => {
	const { images, options } = props;
	const { config, get, toggle } = gallery;
	const [index, setIndex] = useState(0);
	const fallbackId = useFormattedId();
	const id = `gallery-${options?.id ?? fallbackId}`;
	const title = `${id}-title`;

	// Get default attributes for gallery
	const direction = options?.direction ?? config.values.direction;
	const styles = get.styles(direction);

	// Toggle gallery on image click
	const handleToggle = (e: EventsType, imageIndex: number) => {
		toggle(e, id);
		setIndex(imageIndex);
	};

	return images && images.length !== 0 ? (
		<>
			<div className={config.classes.gallery}>
				{images.map((image, imageIndex) => {
					// Determine if gallery element is tall, wide, or square
					const img = new Image();
					img.src = image.image;
					console.log(img);

					return (
						<button
							className="gallery-thumbnail pointer unstyled"
							style={{ width: '50px', height: '50px' }}
							type="button"
							aria-label={`View ${image.alt}`}
							onClick={(e) => handleToggle(e, imageIndex)}
							key={image.image}
						>
							<Image alt={image.alt} hasLazy={true} image={image.image} />
						</button>
					);
				})}
			</div>

			<GalleryOverlay direction={direction} id={id} title={title} images={images} index={index} setIndex={setIndex} styles={styles} />
		</>
	) : null;
};

export const GalleryOverlay = (props: GalleryOverlayProps) => {
	const { direction, id, title, images, index, setIndex, styles } = props;
	const image = images[index];
	const { utils } = useAppContext();
	const { config, toggle } = gallery;
	const [overlay] = useState(() => {
		const element = document.createElement('div');
		utils.setAttributes(element, {
			id: id,
			class: 'gallery-overlay pointer',
			role: 'dialog',
			'aria-modal': 'true',
			'aria-labelledby': title,
			'data-direction': direction,
			style: styles,
		});
		element.setAttribute('inert', '');
		element.onclick = (e) => {
			if (e.target === element) toggle(e, false);
		};
		return element;
	});

	// Append overlay element to body on mount, remove on unmount
	useEffect(() => {
		const galleryTarget = document.querySelector('body');
		if (!galleryTarget) return;

		galleryTarget.appendChild(overlay);

		return () => {
			overlay.remove();
		};
	}, [overlay]);

	// Close active gallery(s) when escape is pressed
	// Note: set.gallery already restores focus to whatever opened the overlay
	useEffect(() => {
		const activeSelector = `.${config.classes.overlay}.${config.classes.active}`;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key !== 'Escape') return;
			if (document.querySelectorAll(activeSelector).length === 0) return;
			toggle(e, false);
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [config, toggle]);

	// Functionality for gallery navigation
	const getImage = (direction: string) => {
		if (direction == 'previous') {
			setIndex(index === 0 ? images.length - 1 : index - 1);
		} else {
			setIndex(index === images.length - 1 ? 0 : index + 1);
		}
	};

	// Overlay component
	const overlayComponent = (
		<>
			<h2 id={title} className="sr-only">
				{image.alt}
			</h2>

			<button className="gallery-close pointer unstyled" type="button" aria-label="Close" onClick={(e) => toggle(e, false)}>
				<Icon id={'close-thin'} />
			</button>

			<nav aria-label="Gallery Navigation">
				<button type="button" onClick={() => getImage('previous')}>
					Previous
				</button>

				<button type="button" onClick={() => getImage('next')}>
					Next
				</button>
			</nav>

			<div role="presentation">
				<Image alt={image.alt} hasLazy={true} image={image.image} />
			</div>
		</>
	);

	return createPortal(overlayComponent, overlay);
};
