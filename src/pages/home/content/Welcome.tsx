/* Scripts */
import { HomeProps } from '../scripts/home-types';

/* Components */
import { Section } from '../../../components/section/Section';

export const Welcome = (props: HomeProps) => {
	const { contentOnly, id, label } = props;

	return (
		<Section id={id} label={label} contentOnly={contentOnly}>
			<p>
				Thanks for visiting our wedding website! If you attended on <strong>September 7, 2013</strong>, we're glad you made it for this
				awesome event in our lives. Though the wedding is over, the memories (and this website) remain. If you weren't able to attend, rest
				assured you were there in spirit, partying hard.
			</p>

			<h3 className="signature">matt and adria</h3>
		</Section>
	);
};
