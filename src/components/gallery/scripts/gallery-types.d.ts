/* Type definitions */
type GalleryImage = {
	image: string;
	name: string;
};

type Gallery = GalleryImage[];

/* Export prop types */
export type GalleryImageProps = GalleryImage;

export type GalleryProps = Gallery;
