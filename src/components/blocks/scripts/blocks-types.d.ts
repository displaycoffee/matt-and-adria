/* Packages */
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

/* Type definitions */
type LinkExternal = {
	children: ReactNode;
	href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href' | 'rel' | 'target'>;

type LinkScroll = {
	children: ReactNode;
	target: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick' | 'type'>;

type Section = {
	children: ReactNode;
	contentOnly?: boolean;
	id: string;
	label: string;
};

/* Export prop types */
export type LinkExternalProps = LinkExternal;

export type LinkScrollProps = LinkScroll;

export type SectionProps = Section;
