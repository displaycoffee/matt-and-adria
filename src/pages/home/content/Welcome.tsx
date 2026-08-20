/* Scripts */
import { HomeProps } from '../scripts/home-types';

/* Components */
import { Section } from '../../../components/blocks/Blocks';

export const Welcome = (props: HomeProps) => {
	const { id } = props;

	return (
		<Section id={id} hasScroll={false}>
			<p>
				Thanks for visiting our wedding website! If you attended on <strong>September 7, 2013</strong>, we're glad you made it for this
				awesome event in our lives. Though the wedding is over, the memories (and this website) remain. If you weren't able to attend, rest
				assured you were there in spirit, partying hard.
			</p>

			<p className="signature h3">matt and adria</p>
		</Section>
	);
};
