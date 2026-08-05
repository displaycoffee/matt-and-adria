/* Styles */
import './styles/navigation.scss';

/* Packages */
import { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* Scripts */
import { useAppContext } from '../../context/scripts/context-hooks';
import { NavigationComponentProps, NavigationListItemProps } from './scripts/navigation-types';
import { navigationUtils } from './scripts/navigation-utils';

/* Get navigation menu */
const navigationList = navigationUtils.get.list();

export const Navigation = (props: NavigationComponentProps) => {
	const { label } = props;
	const { pathname } = useLocation();
	const { utils } = useAppContext();

	// Scroll to top when navigation link is clicked on
	useEffect(() => {
		utils.scrollTo();
	}, [pathname, utils]);

	return navigationList.length != 0 ? (
		<nav className="navigation" aria-label={label}>
			<ul className="navigation-list unstyled">
				{navigationList.map((nav) => {
					return (
						<Fragment key={nav.id}>
							<NavigationListItem nav={nav} />
						</Fragment>
					);
				})}
			</ul>
		</nav>
	) : null;
};

export const NavigationListItem = (props: NavigationListItemProps) => {
	const { nav } = props;
	const { utils } = useAppContext();
	const navProps = nav?.props ?? {};

	return (
		<li className="navigation-list-item">
			{nav.isScroll && navProps?.id ? (
				<button
					className="pointer unstyled a"
					type="button"
					aria-label={`Scroll to '${nav.label}' button`}
					onClick={(e) => utils.scrollTo(e, `#${navProps.id}`)}
				>
					{nav.label}
				</button>
			) : (
				<a href={nav.url} target="_blank" rel="noreferrer">
					{nav.label}
				</a>
			)}
		</li>
	);
};
