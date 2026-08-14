/* Packages */
import { useEffect } from 'react';

/* Variables for useBodyClass */
const bodyPrefix = 'page-';
const bodySelector = document.querySelector('body');

export const useBodyClass = (defaultPrefix: string) => {
	useEffect(() => {
		if (!bodySelector) return;

		// Add new body class
		bodySelector.classList.add(`${bodyPrefix}${defaultPrefix}`);
	}, [defaultPrefix]);

	return null;
};
