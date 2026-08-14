/* Packages */
import { CSSProperties } from 'react';

/* Type definitions */
type Gallery = GalleryImage[];

type GalleryImage = {
	alt: string;
	image: string;
};

type GalleryOptions = {
	images?: GalleryImage[];
	options?: {
		direction?: string;
		id?: string;
	};
};

type GalleryOrientation = 'tall' | 'wide' | 'square' | null;

type GalleryOverlay = {
	direction: string;
	id: string;
	images: GalleryImage[];
	index: number;
	setIndex: Dispatch<SetStateAction<number>>;
	styles: CSSProperties;
	title: string;
};

type GalleryThumbnail = {
	image: GalleryImage;
	onClick: (e: EventsType) => void;
};

type GalleryTouch = React.TouchEvent;

type GalleryTouchRef = { x: number; y: number } | null;

/* Export types */
export type GalleryOrientationType = GalleryOrientation;

export type GalleryTouchType = GalleryTouch;

export type GalleryTouchRefType = GalleryTouchRef;

/* Export prop types */
export type GalleryProps = GalleryOptions;

export type GalleryImageProps = GalleryImage;

export type GalleryOverlayProps = GalleryOverlay;

export type GalleryThumbnailProps = GalleryThumbnail;
