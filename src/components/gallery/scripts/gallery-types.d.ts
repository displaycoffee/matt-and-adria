/* Type definitions */
type GalleryImage = {
	alt: string;
	image: string;
};

type Gallery = GalleryImage[];

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
	styles: string;
	title: string;
};

/* Export prop types */
export type GalleryImageProps = GalleryImage;

export type GalleryOverlayProps = GalleryOverlay;

export type GalleryProps = GalleryOptions;
