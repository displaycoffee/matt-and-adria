/* Packages */
import type { SyntheticEvent } from 'react';
import type { UtilsType as UtilsSharedType, UtilsBrowserType as UtilsSharedBrowserType } from '@displaycoffee/scripts/utils-types';
import type themeJson from '@/_core/tokens/theme.json';
import type { icons } from '@/_core/data/icons';

/* Type definitions */
type Events = SyntheticEvent | Event;

type IconName = keyof typeof icons;

type ObjectString = {
	[key: string]: string;
};

type ObjectPrimitive = {
	[key: string]: Primitive;
};

type Primitive = string | number | boolean;

type Site = {
	name: string;
	description: string;
	url: string;
};

type Target = {
	name: string;
	src: string;
	hasTabindex: boolean;
	isScript: boolean;
};

type Theme = {
	breakpoints: (typeof themeJson)['breakpoint'];
	colors: (typeof themeJson)['color'];
};

type Utils = UtilsSharedType;

type UtilsBrowser = UtilsSharedBrowserType;

type Variables = {
	paths: {
		basename: string;
	};
	site: Site;
};

declare global {
	// Declare global types
	type EventsType = Events;

	type IconNameType = IconName;

	type ObjectStringType = ObjectString;

	type ObjectPrimitiveType = ObjectPrimitive;

	type SiteType = Site;

	type TargetType = Target;

	type ThemeType = Theme;

	type UtilsType = Utils;

	type UtilsBrowserType = UtilsBrowser;

	type VariablesType = Variables;

	// Declare global prop types
	type ObjectPrimitiveProps = ObjectPrimitive;
}

/* Export global types */
export {};
