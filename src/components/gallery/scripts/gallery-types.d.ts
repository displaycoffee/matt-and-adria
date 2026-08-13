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
	options: {
		direction?: string;
		id?: string;
	};
};

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

/* Export prop types */
export type GalleryProps = GalleryOptions;

export type GalleryImageProps = GalleryImage;

export type GalleryOverlayProps = GalleryOverlay;

export type GalleryThumbnailProps = GalleryThumbnail;
