/* Packages */
import type { ReactNode } from 'react';

/* Type definitions */
type ContextValues = {
	theme: ThemeType;
	utils: UtilsType;
	utilsBrowser: UtilsBrowserType;
	variables: VariablesType;
};

type Context = {
	children: ReactNode;
};

/* Export types */
export type ContextValuesType = ContextValues;

/* Export prop types */
export type ContextProps = Context;
