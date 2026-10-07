/* Packages */
import type { ReactNode } from 'react';

/* Type definitions */
type NavigationComponent = {
	data: NavigationMap | NavigationItem[];
	label: string;
};

type NavigationItemComponent = {
	children?: ReactNode;
	isLast: boolean;
	nav: NavigationItem;
	navigationLinkClass: string;
};

/* What Navigation renders, whether the items come from a NavigationMap (navigation.ts) or a list from another source */
type NavigationItem = {
	children?: NavigationItem[];
	id: string;
	isSection: boolean;
	label: string;
	url: string;
};

type NavigationFlatItem = NavigationItem & {
	children?: NavigationFlatItem[];
	includeInSitemap: boolean;
	showInNav: boolean;
};

type NavigationMapItem = {
	children?: NavigationMap;
	id: string;
	includeInSitemap: boolean;
	isSection: boolean;
	label: string;
	showInNav: boolean;
	url: string;
};

type NavigationMap = {
	[key: string]: NavigationMapItem;
};

type NavigationMapItemOptions = {
	children?: NavigationMap;
	includeInSitemap?: boolean;
	isSection?: boolean;
	key: string;
	label: string;
	showInNav?: boolean;
	url?: string;
};

/* Export types */
export type NavigationItemType = NavigationItem;

export type NavigationFlatItemType = NavigationFlatItem;

export type NavigationMapItemType = NavigationMapItem;

export type NavigationMapType = NavigationMap;

export type NavigationMapItemOptionsType = NavigationMapItemOptions;

/* Export prop types */
export type NavigationComponentProps = NavigationComponent;

export type NavigationItemComponentProps = NavigationItemComponent;
