/* Scripts */
import { NavigationType } from './navigation-types';
import { utils } from '../../../_config/scripts/utils';

/* Components */
import { Credits } from '../../../pages/home/content/Credits';
import { DateAndTime } from '../../../pages/home/content/DateAndTime';
import { Location } from '../../../pages/home/content/Location';
import { NearbyAirports } from '../../../pages/home/content/NearbyAirports';
import { Photos } from '../../../pages/home/content/Photos';

export const navigation: NavigationType[] = [
	{
		id: 0,
		element: DateAndTime,
		isScroll: true,
		label: 'Date and Time',
		showInNav: true,
	},
	{
		id: 1,
		element: Location,
		isScroll: true,
		label: 'Location',
		showInNav: true,
	},
	{
		id: 2,
		element: NearbyAirports,
		isScroll: true,
		label: 'Nearby Airports',
		showInNav: true,
	},
	{
		id: 3,
		element: Photos,
		isScroll: true,
		label: 'Photos',
		showInNav: true,
	},
	{
		id: 4,
		element: Credits,
		isScroll: true,
		label: 'Credits',
		showInNav: true,
	},
];

/* Create handle for navigation */
navigation.forEach((nav) => {
	nav.props = {
		contentOnly: nav.label == 'Welcome' ? true : false,
		id: `section-${utils.handleize(nav.label)}`,
		label: nav.label,
	};
});
