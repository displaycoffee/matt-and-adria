/* Type definitions */
type Navigation = {
	children?: Navigation[];
	element?: JSX.Element;
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
