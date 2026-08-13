/* Scripts */
import { HomeProps } from '../scripts/home-types';

/* Components */
import { Section } from '../../../components/section/Section';

export const NearbyAirports = (props: HomeProps) => {
	const { id, label } = props;

	return (
		<Section id={id} label={label}>
			<p>
				If you are flying into Colorado, we recommend the{' '}
				<a href="//coloradosprings.gov/flycos" target="_blank" rel="noreferrer">
					Colorado Springs Airport
				</a>
				. You can stay in Colorado Springs and the drive to Divide is not bad at all.
			</p>

			<p>
				Occasionlly, the{' '}
				<a href="//www.flydenver.com" target="_blank" rel="noreferrer">
					Denver International
				</a>{' '}
				Airport may have cheaper tickets into Colorado. However, it is much farther away from Divide. Unless you plan on doing some
				sight-seeing in Denver while in Colorado, it would be better to fly into Colorado Springs. The overall cost should be less expensive.
			</p>
		</Section>
	);
};
