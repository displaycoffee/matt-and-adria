/* Styles */
import './styles/image.scss';

/* Scripts */
import type { ImageProps, ImageAttributesType, WrapperAttributesType } from './scripts/image-types';
import { image as imageUtils } from './scripts/image';

export const Image = (props: ImageProps) => {
	const { alt, hasBg, hasLazy, hasWrapper = true, height, image, imageClass, width, wrapperClasses } = props;
	const wrapperPrefix = 'image-wrapper';

	// Set up initial attributes
	const wrapperAttributes: WrapperAttributesType = {
		className: wrapperPrefix,
	};
	const imageAttributes: ImageAttributesType = {
		onError: imageUtils.onError,
		src: image,
	};

	// Adjust wrapper attributes
	if (hasWrapper) {
		if (wrapperClasses && wrapperClasses.length !== 0) {
			// Add prefix to each class
			const prefixedClasses = wrapperClasses.map((className) => {
				return `${wrapperPrefix}-${className}`;
			});

			// Set new class
			wrapperAttributes.className = `${wrapperPrefix} ${prefixedClasses.join(' ')}`;
		}
		if (hasBg) {
			wrapperAttributes.style = {
				backgroundImage: `url(${image})`,
			};
		}
	}

	// Create alt text
	const altText = alt || '';

	// Adjust image attributes
	if (hasLazy) imageAttributes.loading = 'lazy';

	// Use known dimensions so space is reserved before load, otherwise set them from the loaded image
	if (width && height) {
		imageAttributes.width = width;
		imageAttributes.height = height;
	} else {
		imageAttributes.onLoad = imageUtils.onLoad;
	}

	if (imageClass) imageAttributes.className = imageClass;
	if (hasWrapper && hasBg) {
		if (!imageAttributes.className) {
			imageAttributes.className = 'image-hidden';
		} else {
			imageAttributes.className = imageAttributes.className + ' image-hidden';
		}
	}

	return hasWrapper ? (
		<div {...wrapperAttributes}>
			<img {...imageAttributes} alt={altText} />
		</div>
	) : (
		<img {...imageAttributes} alt={altText} />
	);
};
