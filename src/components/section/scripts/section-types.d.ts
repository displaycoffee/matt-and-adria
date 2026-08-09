/* Type definitions */
type Section = {
	children: ReactNode;
	id: string;
	label: string;
	showHeader?: boolean;
};

/* Export prop types */
export type SectionProps = Section;
