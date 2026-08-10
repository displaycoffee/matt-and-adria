/* Type definitions */
type Section = {
	children: ReactNode;
	contentOnly?: boolean;
	id: string;
	label: string;
};

/* Export prop types */
export type SectionProps = Section;
