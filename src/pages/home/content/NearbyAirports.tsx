/* Scripts */
import { HomeProps } from '../scripts/home-types';

/* Components */
import { LinkExternal, Section } from '../../../components/blocks/Blocks';

export const NearbyAirports = (props: HomeProps) => {
	const { id, label } = props;

	return (
		<Section id={id} label={label}>
			<p>
				If you are flying into Colorado, we recommend the{' '}
				<LinkExternal href="//coloradosprings.gov/flycos">Colorado Springs Airport</LinkExternal>. You can stay in Colorado Springs and the
				drive to Divide is not bad at all.
			</p>

			<p>
				Occasionlly, the <LinkExternal href="//www.flydenver.com">Denver International</LinkExternal> Airport may have cheaper tickets into
				Colorado. However, it is much farther away from Divide. Unless you plan on doing some sight-seeing in Denver while in Colorado, it
				would be better to fly into Colorado Springs. The overall cost should be less expensive.
			</p>
		</Section>
	);
};
