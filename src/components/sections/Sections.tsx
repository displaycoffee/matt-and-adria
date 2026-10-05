/* Styles */
import './styles/sections.scss';

/* Scripts */
import type { SectionsProps } from './scripts/sections-types';
import { photos } from './scripts/photos';

/* Components */
import { LinkExternal, List, Section } from '@/components/blocks/Blocks';
import { Icon } from '@/components/icons/Icons';
import { Image } from '@/components/image/Image';
import { Gallery } from '@/components/gallery/Gallery';

export const Credits = (props: SectionsProps) => {
	const { id, title } = props;

	return (
		<Section id={id} title={title}>
			<p>
				<strong>Special thanks to:</strong>
			</p>

			<List>
				<li>Gary at the "Lodge at Elk Valley".</li>
				<li>Josh Brambila and Carl Vaeth for cooking delicious BBQ.</li>
				<li>
					<LinkExternal href={'//adventureinstead.com'}>Adventure Instead</LinkExternal> (Maddie Mae) for photography.
				</li>
				<li>
					<LinkExternal href={'//www.toptal.com/designers/subtlepatterns/dot-grid-pattern'}>Subtle Patterns</LinkExternal> for the footer
					background.
				</li>
			</List>
		</Section>
	);
};

export const DateAndTime = (props: SectionsProps) => {
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

export const Location = (props: SectionsProps) => {
	const { id, title } = props;
	const prefix = '//maps.google.com/maps?';
	const maps = {
		coSprings: `${prefix}saddr=Colorado+Springs,+CO&daddr=602+County+Road+511,+Divide,+CO&hl=en&sll=38.967818,-105.109119&sspn=0.058925,0.132093&geocode=FdqOUAIdjY3A-Skr0uahLkEThzETa-j1kuuOQQ%3BFfLDUgIdFVy7-SkBW7-20awUhzHzjFEEZed8EQ&oq=colorado&mra=ls&t=m&z=12`,
		denver: `${prefix}saddr=denver,+CO&daddr=602+County+Road+511,+Divide,+CO&hl=en&sll=38.912994,-104.991559&sspn=0.235884,0.528374&geocode=Fd9YXgIdcg---SnPFx8jqoBrhzHWNoon-PSOEQ%3BFfLDUgIdFVy7-SkBW7-20awUhzHzjFEEZed8EQ&mra=ls&t=m&z=10`,
		divide: `${prefix}saddr=divide,+co&daddr=602+County+Road+511,+Divide,+CO&hl=en&sll=38.997934,-105.550567&sspn=7.536479,16.907959&geocode=FYc0UgIdK2y7-SmnxCgd-KwUhzFO91i76tXAiQ%3BFfLDUgIdFVy7-SkBW7-20awUhzHzjFEEZed8EQ&oq=602+County+Road+511&mra=ls&t=m&z=14`,
		lodge: `${prefix}q=602+County+Road+511,+Divide,+CO&hl=en&ll=38.978528,-105.161691&spn=0.029458,0.066047&sll=38.997934,-105.550567&sspn=7.536479,16.907959&oq=602+County+Road+511&hnear=602+County+Road+511,+Divide,+Colorado+80814&t=m&z=15`,
		woodlandPark: `${prefix}saddr=Woodland+Park,+CO&daddr=602+County+Road+511,+Divide,+CO&hl=en&ll=38.967818,-105.109119&spn=0.058925,0.132093&sll=38.960706,-105.159585&sspn=0.058931,0.132093&geocode=Fdn_UgIdXvW8-SlBvg3Fy6oUhzFvYb-VdC4fzQ%3BFfLDUgIdFVy7-SkBW7-20awUhzHzjFEEZed8EQ&oq=woodland&mra=ls&t=m&z=1`,
	};

	return (
		<Section id={id} title={title}>
			<div className="row row-section row-wrap row-auto row-spacing-20">
				<div className="column column-photo">
					<Image
						alt={'Lodge at Elk Valley'}
						hasLazy={true}
						width={300}
						height={200}
						image={'/assets/images/theme/lodge.jpg'}
						wrapperClasses={['polaroid']}
					/>
				</div>

				<div className="column column-content margin-trim">
					<p>Matt and Adria will be getting married at the beautiful "Lodge at Elk Valley" in Divide, Colorado.</p>

					<div className="row row-address row-nowrap row-auto row-spacing-10">
						<div className="column">
							<Icon name={'compass'} />
							<strong>Address:</strong>
						</div>
						<div className="column">
							602 County Road 511
							<br />
							Divide, Colorado
							<br />
							<LinkExternal href={maps.lodge}>Map</LinkExternal>
						</div>
					</div>

					<List>
						<li>
							From <LinkExternal href={maps.divide}>Divide</LinkExternal>, it takes about five minutes to get to the lodge.
						</li>
						<li>
							From <LinkExternal href={maps.woodlandPark}>Woodland Park</LinkExternal>, it takes about 15 minutes.
						</li>
						<li>
							From <LinkExternal href={maps.coSprings}>Colorado Springs</LinkExternal>, it takes about 43 minutes.
						</li>
						<li>
							From <LinkExternal href={maps.denver}>Denver</LinkExternal>, it takes about 1 hour and 47 minutes.
						</li>
					</List>
				</div>
			</div>
		</Section>
	);
};

export const NearbyAirports = (props: SectionsProps) => {
	const { id, title } = props;

	return (
		<Section id={id} title={title}>
			<p>
				If you are flying into Colorado, we recommend the{' '}
				<LinkExternal href={'//coloradosprings.gov/flycos'}>Colorado Springs Airport</LinkExternal>. You can stay in Colorado Springs and the
				drive to Divide is not bad at all.
			</p>

			<p>
				Occasionlly, the <LinkExternal href={'//www.flydenver.com'}>Denver International</LinkExternal> Airport may have cheaper tickets into
				Colorado. However, it is much farther away from Divide. Unless you plan on doing some sight-seeing in Denver while in Colorado, it
				would be better to fly into Colorado Springs. The overall cost should be less expensive.
			</p>
		</Section>
	);
};

export const Photos = (props: SectionsProps) => {
	const { id, title } = props;

	return (
		<Section id={id} title={title}>
			<p>
				<strong>Note:</strong> To protect the privacy of others, not all wedding photos are listed here. Rest assured, we have plenty of
				pictures of drunk and happy folk.
			</p>

			{photos && photos.length !== 0 ? <Gallery images={photos} /> : null}
		</Section>
	);
};

export const Welcome = (props: SectionsProps) => {
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
