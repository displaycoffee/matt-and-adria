/* Scripts */
import { HomeProps } from '../scripts/home-types';

/* Components */
import { Section } from '../../../components/section/Section';

export const Welcome = (props: HomeProps) => {
	const { id, label, showHeader } = props;

	return (
		<Section id={id} label={label} showHeader={showHeader}>
			<p>
				Thanks for visiting our wedding website! We're glad you can make it for this awesome event in our lives. We will attempt to keep this
				website updated with information. If you have any other questions, please contact Matt or Adria. Otherwise, we look forward to seeing
				you on September 7, 2013!
			</p>

			<h4 className="signature h3">matt and adria</h4>
		</Section>
	);
};
