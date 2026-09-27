/* Packages */
import type { SyntheticEvent } from 'react';
import type themeJson from '../tokens/theme.json';

/* Type definitions */
type Events = SyntheticEvent | Event;

type Fallback = {
	family: string;
	size: string;
	src: string;
};

type FallbacksJson = typeof themeJson.fallback;

type Favicon = {
	isHead: boolean;
	isManifest: boolean;
	purpose: string;
	rel: string;
	src: string;
	size: string;
	sizes: string;
	type: string;
};

type FaviconsJson = typeof themeJson.favicon;

type Font = {
	display: string;
	ext: string;
	family: string;
	isPreload: boolean;
	src: string;
	style: string;
	weight: string | number;
};

type FontsJson = typeof themeJson.font;

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

type Utils = {
	getLast: (value: string | string[], delimeter?: string) => string | number;
	getPage: () => string;
	handleize: (value: string) => string;
	isSticky: (element: HTMLElement | null, stickyClass: string) => void;
	scrollTo: (e?: Events, selector?: string, offset?: number) => void;
	setAttributes: (element: HTMLElement, attributes: ObjectString) => void;
};

type Variables = {
	paths: {
		basename: string;
	};
	site: Site;
};

declare global {
	// Declare global types
	type EventsType = Events;

	type FallbackType = Fallback;

	type FallbacksJsonType = FallbacksJson;

	type FaviconType = Favicon;

	type FaviconsJsonType = FaviconsJson;

	type FontType = Font;

	type FontsJsonType = FontsJson;

	type ObjectStringType = ObjectString;

	type ObjectPrimitiveType = ObjectPrimitive;

	type SiteType = Site;

	type TargetType = Target;

	type ThemeType = Theme;

	type UtilsType = Utils;

	type VariablesType = Variables;

	// Declare global prop types
	type ObjectPrimitiveProps = ObjectPrimitive;
}

/* Export global types */
export {};
