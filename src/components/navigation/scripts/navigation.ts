/* Scripts */
import type { NavigationMapType } from './navigation-types';
import { navigationUtils } from './navigation-utils';

const { create } = navigationUtils;

export const navigationHeader: NavigationMapType = {
	...create({ key: 'date-and-time', label: 'Date and Time', includeInSitemap: false }),
	...create({ key: 'location', label: 'Location', includeInSitemap: false }),
	...create({ key: 'nearby-airports', label: 'Nearby Airports', includeInSitemap: false }),
	...create({ key: 'photos', label: 'Photos', includeInSitemap: false }),
	...create({ key: 'credits', label: 'Credits', includeInSitemap: false }),
};
