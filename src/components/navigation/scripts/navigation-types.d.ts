import type { ComponentType } from 'react';

/* Type definitions */
type Navigation = {
	children?: Navigation[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- nav components have differing prop shapes
	element?: ComponentType<any>;
	id: number;
	isRoute?: boolean;
	isScroll?: boolean;
	label: string;
	props?: ObjectPrimitiveType;
	showInNav?: boolean;
	url?: string;
};

type NavigationComponent = {
	label: string;
};

type NavigationListItem = {
	isLast: boolean;
	nav: Navigation;
};

/* Export types */
export type NavigationType = Navigation;

/* Export prop types */
export type NavigationComponentProps = NavigationComponent;

export type NavigationListItemProps = NavigationListItem;
