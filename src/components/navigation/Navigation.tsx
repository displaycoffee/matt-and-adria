/* Styles */
import './styles/navigation.scss';

/* Packages */
import { Fragment } from 'react';

/* Scripts */
import type { NavigationComponentProps, NavigationItemComponentProps } from './scripts/navigation-types';
import { navigationUtils } from './scripts/navigation-utils';
import { useRespond } from '@displaycoffee/scripts/hooks';
import { useAppContext } from '../../context/scripts/context-hooks';

/* Components */
import { LinkExternal, List } from '../blocks/Blocks';
import { ButtonScroll } from '../forms/Forms';

export const Navigation = (props: NavigationComponentProps) => {
	const { data, label } = props;
	const navigationList = navigationUtils.get.list(data);
	const navigationLinkClass = 'navigation-link';

	return navigationList.length != 0 ? (
		<nav className="navigation" aria-label={label}>
			<List className={'navigation-list'} variant={'ul-unstyled'}>
				{navigationList.map((nav, index) => {
					const isLast = index === navigationList.length - 1;

					return (
						<Fragment key={nav.id}>
							<NavigationListItem isLast={isLast} navigationLinkClass={navigationLinkClass} nav={nav} />
						</Fragment>
					);
				})}
			</List>
		</nav>
	) : null;
};

export const NavigationListItem = (props: NavigationItemComponentProps) => {
	const { children, isLast, nav, navigationLinkClass } = props;
	const { theme } = useAppContext();
	const isDesktop = useRespond(theme.breakpoints.md);

	return (
		<>
			<li className="navigation-list-item">
				{nav.isSection ? (
					<ButtonScroll
						className={navigationLinkClass}
						target={`#section-${nav.id}`}
						label={nav.label}
						aria-label={`Scroll to '${nav.label}' button`}
					/>
				) : (
					<LinkExternal href={nav.url}>{nav.label}</LinkExternal>
				)}
				{children}
			</li>

			{!isDesktop ? null : isLast ? null : <li className="navigation-list-item navigation-list-item-bullet">&bull;</li>}
		</>
	);
};
