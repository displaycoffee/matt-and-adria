/* Packages */
import { createContext } from 'react';

/* Scripts */
import type { ContextProps, ContextValuesType } from './scripts/context-types';
import { theme } from '../_core/scripts/theme';
import { utils } from '../_core/scripts/utils';
import { variables } from '../_core/scripts/variables';

/* Create context */
export const Context = createContext({} as ContextValuesType);

/* Create Context.Provider wrapper */
export const ContextProvider = ({ children }: ContextProps) => {
	const values: ContextValuesType = {
		theme,
		utils,
		variables,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
};
