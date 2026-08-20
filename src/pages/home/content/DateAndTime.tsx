/* Scripts */
import { HomeProps } from '../scripts/home-types';

/* Components */
import { List, Section } from '../../../components/blocks/Blocks';

export const DateAndTime = (props: HomeProps) => {
	const { id, title } = props;

	return (
		<Section id={id} title={title}>
			<List>
				<li>
					<strong>Date:</strong> September 7, 2013
				</li>
				<li>
					<strong>Time:</strong> 5:30pm MDT
				</li>
				<li>
					<strong>Location:</strong> Both the wedding and reception will be held at the "Lodge at Elk Valley" (see below)
				</li>
			</List>
		</Section>
	);
};
