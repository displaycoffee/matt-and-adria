/* Styles */
import './styles/home.scss';

/* Packages */
import { Fragment } from 'react';

/* Scripts */
import { navigationUtils } from '../../components/navigation/scripts/navigation-utils';

/* Components */
import { Welcome } from './content/Welcome';

/* Get navigation menu */
const navigationList = navigationUtils.get.list();

export const Home = () => {
	return (
		<div className="home">
			<Welcome id={'welcome'} />

			{navigationList.length != 0
				? navigationList.map((nav) => {
						const navProps = nav?.props ?? {};
						// Note: element is guaranteed here since every navigation entry defines one
						const NavElement = nav.element!;

						return (
							<Fragment key={nav.id}>
								<NavElement {...navProps} />
							</Fragment>
						);
					})
				: null}
		</div>
	);
};
