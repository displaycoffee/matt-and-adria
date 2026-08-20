/* Styles */
import './styles/navigation.scss';

/* Packages */
import { Fragment } from 'react';

/* Scripts */
import { useRespond } from '../../_config/scripts/hooks';
import { useAppContext } from '../../context/scripts/context-hooks';
import { NavigationComponentProps, NavigationListItemProps } from './scripts/navigation-types';
import { navigationUtils } from './scripts/navigation-utils';

/* Components */
import { LinkExternal, List } from '../blocks/Blocks';
import { ButtonScroll } from '../forms/Forms';

/* Get navigation menu */
const navigationList = navigationUtils.get.list();

export const Navigation = (props: NavigationComponentProps) => {
	const { label } = props;

	return navigationList.length != 0 ? (
		<nav className="navigation" aria-label={label}>
			<List className="navigation-list" variant="ul-unstyled">
				{navigationList.map((nav, index) => {
					const isLast = index === navigationList.length - 1;

					return (
						<Fragment key={nav.id}>
							<NavigationListItem nav={nav} isLast={isLast} />
						</Fragment>
					);
				})}
			</List>
		</nav>
	) : null;
};

export const NavigationListItem = (props: NavigationListItemProps) => {
	const { nav, isLast } = props;
	const { theme } = useAppContext();
	const isDesktop = useRespond(theme.bps.bp02 as number);
	const navProps = nav?.props ?? {};

	return (
		<>
			<li className="navigation-list-item navigation-list-item-link">
				{nav.isScroll && navProps?.id ? (
					<ButtonScroll target={`#section-${navProps.id}`} label={nav.label} aria-label={`Scroll to '${nav.label}' button`} />
				) : (
					<LinkExternal href={nav.url ?? ''}>{nav.label}</LinkExternal>
				)}
			</li>

			{!isDesktop ? null : isLast ? null : <li className="navigation-list-item navigation-list-item-bullet">&bull;</li>}
		</>
	);
};
