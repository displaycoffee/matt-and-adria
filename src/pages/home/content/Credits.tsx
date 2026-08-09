/* Scripts */
import { HomeProps } from '../scripts/home-types';

/* Components */
import { Section } from '../../../components/section/Section';

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
					<a href="//adventureinstead.com" target="_blank" rel="noreferrer">
						Adventure Instead
					</a>{' '}
					(Maddie Mae) for photography.
				</li>
				<li>
					<a href="//www.toptal.com/designers/subtlepatterns/dot-grid-pattern" target="_blank" rel="noreferrer">
						Subtle Patterns
					</a>{' '}
					for the footer background.
				</li>
			</ul>
		</Section>
	);
};
