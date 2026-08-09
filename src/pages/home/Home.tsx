/* Styles */
import './styles/home.scss';

/* Packages */
import { Fragment } from 'react';

/* Scripts */
import { navigationUtils } from '../../components/navigation/scripts/navigation-utils';

/* Get navigation menu */
const navigationList = navigationUtils.get.list();

export const Home = () => {
	return (
		<div className="home">
			{navigationList.length != 0
				? navigationList.map((nav) => {
						const navProps = nav?.props ?? {};

						return (
							<Fragment key={nav.id}>
								<nav.element {...navProps} />
							</Fragment>
						);
					})
				: null}
		</div>
	);
};
