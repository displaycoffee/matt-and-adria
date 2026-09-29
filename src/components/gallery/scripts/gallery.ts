export const gallery = {
	config: {
		values: {
			// Default values if props are not defined
			direction: 'top',
		},
	},
	get: {
		thumbnail: (image: string) => {
			// Get thumbnail path for a gallery image (see generate-thumbnails.js)
			return image.replace(/(\.[a-zA-Z0-9]+)$/, '-thumb$1');
		},
	},
};
