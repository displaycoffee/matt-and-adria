/* Styles */
import './styles/gallery.scss';

/* Packages */
import { useEffect, useRef, useState } from 'react';
import IconChevronLeft from '~icons/lucide/chevron-left';
import IconChevronRight from '~icons/lucide/chevron-right';
import IconX from '~icons/lucide/x';

/* Scripts */
import type {
	GalleryOverlayProps,
	GalleryProps,
	GalleryThumbnailProps,
	GalleryOrientationType,
	GalleryTouchType,
	GalleryTouchRefType,
} from './scripts/gallery-types';
import { useFormattedId } from '../../_core/scripts/hooks';
import { gallery } from './scripts/gallery';

/* Components */
import { Button } from '../forms/Forms';
import { Icon } from '../icons/Icons';
import { Image } from '../image/Image';
import { Overlay } from '../overlay/Overlay';

export const Gallery = (props: GalleryProps) => {
	const { images, options } = props;
	const { config } = gallery;
	const [index, setIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const fallbackId = useFormattedId();
	const id = `gallery-${options?.id ?? fallbackId}`;
	const title = `${id}-title`;

	// Get default attributes for gallery
	const direction = options?.direction ?? config.values.direction;

	// Open gallery on image click
	const handleOpen = (imageIndex: number) => {
		setIndex(imageIndex);
		setIsOpen(true);
	};

	return images && images.length !== 0 ? (
		<>
			<div className="gallery">
				{images.map((image, imageIndex) => {
					return <GalleryThumbnail key={image.image} id={id} image={image} onClick={() => handleOpen(imageIndex)} />;
				})}
			</div>

			<GalleryOverlay
				direction={direction}
				id={id}
				title={title}
				images={images}
				index={index}
				setIndex={setIndex}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</>
	) : null;
};

export const GalleryOverlay = (props: GalleryOverlayProps) => {
	const { direction, id, title, images, index, isOpen, onClose, setIndex } = props;
	const image = images[index];

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

	// Note: the dialog covers the whole screen, so the native backdrop is never clicked; clicks on .gallery-content (around the image) close it instead
	return (
		<Overlay
			id={id}
			className={`gallery-overlay gallery-${direction}`}
			isOpen={isOpen}
			onClose={onClose}
			closeOnBackdrop={false}
			aria-labelledby={title}
		>
			<div
				className="gallery-content pointer"
				onClick={(e) => {
					if (e.target === e.currentTarget) onClose();
				}}
				role="presentation"
			>
				<h2 id={title} className="sr-only">
					{image.alt}
				</h2>

				<Button className={'gallery-close'} hideLabel={true} label={'Close gallery image'} onClick={onClose} data-autofocus>
					<Icon icon={IconX} />
				</Button>

				<nav className="gallery-navigation" aria-label="Gallery Navigation">
					<Button
						className={'gallery-navigation-button gallery-navigation-previous'}
						hideLabel={true}
						label={'Previous gallery image'}
						onClick={() => getImage('previous')}
					>
						<Icon icon={IconChevronLeft} />
					</Button>

					<Button
						className={'gallery-navigation-button gallery-navigation-next'}
						hideLabel={true}
						label={'Next gallery image'}
						onClick={() => getImage('next')}
					>
						<Icon icon={IconChevronRight} />
					</Button>
				</nav>

				<div className="gallery-image" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
					<Image alt={image.alt} image={image.image} />
				</div>
			</div>
		</Overlay>
	);
};

const GalleryThumbnail = (props: GalleryThumbnailProps) => {
	const { id, image, onClick } = props;
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
		<Button
			className={`gallery-thumbnail${orientation ? ` gallery-thumbnail-${orientation}` : ''}`}
			hideLabel={true}
			label={`View ${image.alt}`}
			variant={'unstyled'}
			onClick={onClick}
			aria-controls={id}
			aria-haspopup={'dialog'}
			ref={buttonRef}
		>
			<Image alt={image.alt} hasLazy={true} image={get.thumbnail(image.image)} wrapperClasses={['polaroid']} />
		</Button>
	);
};
