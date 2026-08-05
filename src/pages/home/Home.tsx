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
		<div className="home margin-trim">
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
			{/* <Section label={'Date and Time'}>hello 1</Section>

			<Section label={'Location'}>hello 2</Section>

			<Section label={'Nearby Airports'}>hello 3</Section>

			<Section label={'Photos'}>hello 4</Section>

			<Section label={'Credits'}>hello 5</Section> */}
		</div>
	);
};
