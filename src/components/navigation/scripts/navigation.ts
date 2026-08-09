/* Packages */
import { lazy } from 'react';

/* Scripts */
import { NavigationType } from './navigation-types';
import { utils } from '../../../_config/scripts/utils';

/* Components */
const Credits = lazy(() => import('../../../pages/home/content/Credits').then((m) => ({ default: m.Credits })));
const DateAndTime = lazy(() => import('../../../pages/home/content/DateAndTime').then((m) => ({ default: m.DateAndTime })));
const Location = lazy(() => import('../../../pages/home/content/Location').then((m) => ({ default: m.Location })));
const NearbyAirports = lazy(() => import('../../../pages/home/content/NearbyAirports').then((m) => ({ default: m.NearbyAirports })));
const Photos = lazy(() => import('../../../pages/home/content/Photos').then((m) => ({ default: m.Photos })));
const Welcome = lazy(() => import('../../../pages/home/content/Welcome').then((m) => ({ default: m.Welcome })));

export const navigation: NavigationType[] = [
	{
		id: 0,
		element: Welcome,
		isScroll: true,
		label: 'Welcome',
		showInNav: true,
	},
	{
		id: 1,
		element: DateAndTime,
		isScroll: true,
		label: 'Date and Time',
		showInNav: true,
	},
	{
		id: 2,
		element: Location,
		isScroll: true,
		label: 'Location',
		showInNav: true,
	},
	{
		id: 3,
		element: NearbyAirports,
		isScroll: true,
		label: 'Nearby Airports',
		showInNav: true,
	},
	{
		id: 4,
		element: Photos,
		isScroll: true,
		label: 'Photos',
		showInNav: true,
	},
	{
		id: 5,
		element: Credits,
		isScroll: true,
		label: 'Credits',
		showInNav: true,
	},
];

/* Create handle for navigation */
navigation.forEach((nav) => {
	nav.props = {
		id: `section-${utils.handleize(nav.label)}`,
		label: nav.label,
		showHeader: nav.label == 'Welcome' ? false : true,
	};
});
