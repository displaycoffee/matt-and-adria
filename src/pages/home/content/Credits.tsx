/* Scripts */
import { HomeProps } from '../scripts/home-types';

/* Components */
import { LinkExternal, Section } from '../../../components/blocks/Blocks';

export const Credits = (props: HomeProps) => {
	const { id, label } = props;

	return (
		<Section id={id} label={label}>
			<p>
				<strong>Special thanks to:</strong>
			</p>

			<ul>
				<li>Gary at the "Lodge at Elk Valley".</li>
				<li>Josh Brambila and Carl Vaeth for cooking delicious BBQ.</li>
				<li>
					<LinkExternal href="//adventureinstead.com">Adventure Instead</LinkExternal> (Maddie Mae) for photography.
				</li>
				<li>
					<LinkExternal href="//www.toptal.com/designers/subtlepatterns/dot-grid-pattern">Subtle Patterns</LinkExternal> for the footer
					background.
				</li>
			</ul>
		</Section>
	);
};
