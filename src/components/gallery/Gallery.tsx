/* Styles */
import './styles/gallery.scss';

/* Packages */
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/* Scripts */
import { useFormattedId } from '../../_config/scripts/hooks';
import { useAppContext } from '../../context/scripts/context-hooks';
import {
	GalleryOverlayProps,
	GalleryProps,
	GalleryThumbnailProps,
	GalleryOrientationType,
	GalleryTouchType,
	GalleryTouchRefType,
} from './scripts/gallery-types';
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
					return <GalleryThumbnail key={image.image} image={image} onClick={(e) => handleToggle(e, imageIndex)} />;
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

	// Overlay functionality
	const [overlay] = useState(() => {
		const element = document.createElement('div');

		// Set attributes
		utils.setAttributes(element, {
			id: id,
			class: 'gallery-overlay pointer',
			role: 'dialog',
			'aria-modal': 'true',
			'aria-labelledby': title,
			'data-direction': direction,
		});
		element.setAttribute('inert', '');

		// Set styles
		Object.assign(element.style, styles);

		// Add onclick
		element.onclick = (e) => {
			if (e.target === element) toggle(e, false);
		};

		return element;
	});

	// Append overlay element to body on mount, remove on unmount
	useEffect(() => {
		const galleryTarget = document.querySelector('body');
		if (!galleryTarget) return;

		// Append to body
		galleryTarget.appendChild(overlay);

		return () => {
			overlay.remove();
		};
	}, [overlay]);

	// Close active gallery(s) when escape is pressed
	// Note: set.gallery already restores focus to whatever opened the overlay
	useEffect(() => {
		const activeSelector = `.${config.classes.overlay}.${config.classes.active}`;

		// Function for keydown events
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key !== 'Escape') return;
			if (document.querySelectorAll(activeSelector).length === 0) return;
			toggle(e, false);
		};

		// Add and remove event listeners
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

	// Track touch start position to detect a left / right swipe on the image
	const touchStart = useRef<GalleryTouchRefType>(null);
	const swipeThreshold = 50; // minimum horizontal distance (px) to count as a swipe

	// Touch start function for swipe on mobile
	const handleTouchStart = (e: GalleryTouchType) => {
		const touch = e.touches[0];
		touchStart.current = { x: touch.clientX, y: touch.clientY };
	};

	// Touch end function for swipe on mobile
	const handleTouchEnd = (e: GalleryTouchType) => {
		if (!touchStart.current) return;

		// Set delta coordinates
		const touch = e.changedTouches[0];
		const deltaX = touch.clientX - touchStart.current.x;
		const deltaY = touch.clientY - touchStart.current.y;
		touchStart.current = null;

		// Ignore short drags and swipes that are more vertical than horizontal (e.g. scrolling)
		if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) < Math.abs(deltaY)) return;

		// Get previous or next image depending on delta
		getImage(deltaX < 0 ? 'next' : 'previous');
	};

	// Overlay component
	const overlayComponent = (
		<>
			<h2 id={title} className="sr-only">
				{image.alt}
			</h2>

			<button className="gallery-close pointer unstyled" type="button" aria-label="Close gallery image" onClick={(e) => toggle(e, false)}>
				<Icon id={'close-thin'} />
			</button>

			<nav className="gallery-navigation" aria-label="Gallery Navigation">
				<button
					className="gallery-navigation-button gallery-navigation-previous pointer unstyled"
					type="button"
					aria-label="Previous gallery image"
					onClick={() => getImage('previous')}
				>
					<Icon id={'angle-left'} />
				</button>

				<button
					className="gallery-navigation-button gallery-navigation-next pointer unstyled"
					type="button"
					aria-label="Next gallery image"
					onClick={() => getImage('next')}
				>
					<Icon id={'angle-right'} />
				</button>
			</nav>

			<div className="gallery-image" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
				<Image alt={image.alt} image={image.image} />
			</div>
		</>
	);

	return createPortal(overlayComponent, overlay);
};

const GalleryThumbnail = (props: GalleryThumbnailProps) => {
	const { image, onClick } = props;
	const { get } = gallery;
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [orientation, setOrientation] = useState<GalleryOrientationType>(null);

	// Determine if thumbnail image is tall, wide, or square once it's loaded
	useEffect(() => {
		const img = buttonRef.current?.querySelector('img');
		if (!img) return;

		// Function to handle onLoad actions
		const handleLoad = () => {
			const ratio = img.naturalWidth / img.naturalHeight;
			setOrientation(ratio > 1.2 ? 'wide' : ratio < 0.8 ? 'tall' : 'square');
		};

		// If image is complete, check dimensions
		// Otherwise, trigger event listener
		if (img.complete) {
			handleLoad();
		} else {
			img.addEventListener('load', handleLoad);
			return () => img.removeEventListener('load', handleLoad);
		}
	}, []);

	return (
		<button
			ref={buttonRef}
			className={`gallery-thumbnail${orientation ? ` gallery-thumbnail-${orientation}` : ''} pointer unstyled`}
			type="button"
			aria-label={`View ${image.alt}`}
			onClick={onClick}
		>
			<Image alt={image.alt} hasLazy={true} image={get.thumbnail(image.image)} wrapperClasses={['polaroid']} />
		</button>
	);
};
