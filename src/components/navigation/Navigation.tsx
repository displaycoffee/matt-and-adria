/* Styles */
import './styles/navigation.scss';

/* Packages */
import { Fragment } from 'react';

/* Scripts */
import { useRespond } from '../../_config/scripts/hooks';
import { useAppContext } from '../../context/scripts/context-hooks';
import { NavigationComponentProps, NavigationListItemProps } from './scripts/navigation-types';
import { navigationUtils } from './scripts/navigation-utils';

/* Get navigation menu */
const navigationList = navigationUtils.get.list();

export const Navigation = (props: NavigationComponentProps) => {
	const { label } = props;

	return navigationList.length != 0 ? (
		<nav className="navigation" aria-label={label}>
			<ul className="navigation-list unstyled">
				{navigationList.map((nav, index) => {
					const isLast = index === navigationList.length - 1;

					return (
						<Fragment key={nav.id}>
							<NavigationListItem nav={nav} isLast={isLast} />
						</Fragment>
					);
				})}
			</ul>
		</nav>
	) : null;
};

export const NavigationListItem = (props: NavigationListItemProps) => {
	const { nav, isLast } = props;
	const { theme, utils } = useAppContext();
	const isDesktop = useRespond(theme.bps.bp02 as number);
	const navProps = nav?.props ?? {};

	return (
		<>
			<li className="navigation-list-item navigation-list-item-link">
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

			{!isDesktop ? null : isLast ? null : <li className="navigation-list-item navigation-list-item-bullet">&bull;</li>}
		</>
	);
};
