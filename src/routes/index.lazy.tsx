/* Styles */
import './index/styles/index.scss';

/* Packages */
import { createLazyFileRoute } from '@tanstack/react-router';
import { Fragment } from 'react';

/* Scripts */
import { navigationHeader } from '../components/navigation/scripts/navigation';
import { navigationUtils } from '../components/navigation/scripts/navigation-utils';

/* Components */
import { Credits } from './index/children/-Credits';
import { DateAndTime } from './index/children/-DateAndTime';
import { Location } from './index/children/-Location';
import { NearbyAirports } from './index/children/-NearbyAirports';
import { Photos } from './index/children/-Photos';
import { Welcome } from './index/children/-Welcome';

/* Get navigation */
const navigationList = navigationUtils.get.list(navigationHeader);

export const Route = createLazyFileRoute('/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="home">
			<Welcome id={'welcome'} />

			{navigationList.length != 0
				? navigationList.map((nav) => {
						// Pass down nav props
						const navProps = {
							id: nav.id,
							title: nav.label,
						};

						return (
							<Fragment key={nav.id}>
								{{
									credits: <Credits {...navProps} />,
									'date-and-time': <DateAndTime {...navProps} />,
									location: <Location {...navProps} />,
									'nearby-airports': <NearbyAirports {...navProps} />,
									photos: <Photos {...navProps} />,
								}[nav.id] || <p>Section not found.</p>}
							</Fragment>
						);
					})
				: null}
		</div>
	);
}
