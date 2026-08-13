/* Type definitions */
type SlideoutButton = {
	outside: boolean;
	show: boolean;
};

type SlideoutOptions = {
	children?: ReactNode;
	options: {
		button: SlideoutButton;
		direction?: string;
		id?: string;
		isDesktop: boolean;
		label: string;
		width?: string;
	};
};

/* Export prop types */
export type SlideoutOverlayProps = SlideoutOptions;

export type SlideoutProps = SlideoutOptions;
