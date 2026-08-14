/* Scripts */
import { HomeProps } from '../scripts/home-types';

/* Components */
import { Section } from '../../../components/blocks/Blocks';

export const DateAndTime = (props: HomeProps) => {
	const { id, label } = props;

	return (
		<Section id={id} label={label}>
			<ul>
				<li>
					<strong>Date:</strong> September 7, 2013
				</li>
				<li>
					<strong>Time:</strong> 5:30pm MDT
				</li>
				<li>
					<strong>Location:</strong> Both the wedding and reception will be held at the "Lodge at Elk Valley" (see below)
				</li>
			</ul>
		</Section>
	);
};
