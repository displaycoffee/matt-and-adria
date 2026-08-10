/* Scripts */
import { HomeProps } from '../scripts/home-types';

/* Components */
import { Section } from '../../../components/section/Section';

export const Welcome = (props: HomeProps) => {
	const { contentOnly, id, label } = props;

	return (
		<Section id={id} label={label} contentOnly={contentOnly}>
			<p>
				Thanks for visiting our wedding website! We're glad you can make it for this awesome event in our lives. We will attempt to keep this
				website updated with information. If you have any other questions, please contact Matt or Adria. Otherwise, we look forward to seeing
				you on September 7, 2013!
			</p>

			<h3 className="signature">matt and adria</h3>
		</Section>
	);
};
