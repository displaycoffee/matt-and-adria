// /* Styles */
// import './styles/dropdown.scss';

/* Scripts */
import { SectionProps } from './scripts/section-types';

export const Section = (props: SectionProps) => {
	const { children, id, label } = props;

	return (
		<section id={id}>
			<h3>{label}</h3>
			{children}
		</section>
	);
};
