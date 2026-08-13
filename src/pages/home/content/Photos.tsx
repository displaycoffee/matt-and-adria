/* Scripts */
import { HomeProps } from '../scripts/home-types';

/* Components */
import { Section } from '../../../components/section/Section';

export const Photos = (props: HomeProps) => {
	const { id, label } = props;

	return (
		<Section id={id} label={label}>
			<p>
				<strong>Note:</strong> To protect the privacy of others, not all wedding photos are listed here. Rest assured, we have plenty of
				pictures of drunk and happy folk.
			</p>
		</Section>
	);
};
