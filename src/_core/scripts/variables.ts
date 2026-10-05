/* Scripts */
import { site } from '@/_core/data/site';

/* This config contains variables to use through application */
const directory = '/matt-and-adria';
export const variables: VariablesType = {
	paths: {
		basename: typeof window == 'object' && window.location.pathname.includes(directory) ? directory : '',
	},
	site: site,
};
