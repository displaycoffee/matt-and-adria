/* Scripts */
import { HomeProps } from '../scripts/home-types';

/* Components */
import { LinkExternal, List, Section } from '../../../components/blocks/Blocks';
import { Icon } from '../../../components/icons/Icons';
import { Image } from '../../../components/image/Image';

export const Location = (props: HomeProps) => {
	const { id, title } = props;

	return (
		<Section id={id} title={title}>
			<div className="row row-section row-wrap row-auto row-spacing-20">
				<div className="column column-photo">
					<Image alt={'Lodge at Elk Valley'} hasLazy={true} image={'/assets/images/theme/lodge.jpg'} wrapperClasses={['polaroid']} />
				</div>

				<div className="column column-content margin-trim">
					<p>Matt and Adria will be getting married at the beautiful "Lodge at Elk Valley" in Divide, Colorado.</p>

					<div className="row row-address row-nowrap row-auto row-spacing-10">
						<div className="column">
							<Icon id={'compass'} />
							<strong>Address:</strong>
						</div>
						<div className="column">
							602 County Road 511
							<br />
							Divide, Colorado
							<br />
							<LinkExternal href="//maps.google.com/maps?q=602+County+Road+511,+Divide,+CO&hl=en&ll=38.978528,-105.161691&spn=0.029458,0.066047&sll=38.997934,-105.550567&sspn=7.536479,16.907959&oq=602+County+Road+511&hnear=602+County+Road+511,+Divide,+Colorado+80814&t=m&z=15">
								Map
							</LinkExternal>
						</div>
					</div>

					<List>
						<li>
							From{' '}
							<LinkExternal href="//maps.google.com/maps?saddr=divide,+co&daddr=602+County+Road+511,+Divide,+CO&hl=en&sll=38.997934,-105.550567&sspn=7.536479,16.907959&geocode=FYc0UgIdK2y7-SmnxCgd-KwUhzFO91i76tXAiQ%3BFfLDUgIdFVy7-SkBW7-20awUhzHzjFEEZed8EQ&oq=602+County+Road+511&mra=ls&t=m&z=14">
								Divide
							</LinkExternal>
							, it takes about five minutes to get to the lodge.
						</li>
						<li>
							From{' '}
							<LinkExternal href="//maps.google.com/maps?saddr=Woodland+Park,+CO&daddr=602+County+Road+511,+Divide,+CO&hl=en&ll=38.967818,-105.109119&spn=0.058925,0.132093&sll=38.960706,-105.159585&sspn=0.058931,0.132093&geocode=Fdn_UgIdXvW8-SlBvg3Fy6oUhzFvYb-VdC4fzQ%3BFfLDUgIdFVy7-SkBW7-20awUhzHzjFEEZed8EQ&oq=woodland&mra=ls&t=m&z=14">
								Woodland Park
							</LinkExternal>
							, it takes about 15 minutes.
						</li>
						<li>
							From{' '}
							<LinkExternal href="//maps.google.com/maps?saddr=Colorado+Springs,+CO&daddr=602+County+Road+511,+Divide,+CO&hl=en&sll=38.967818,-105.109119&sspn=0.058925,0.132093&geocode=FdqOUAIdjY3A-Skr0uahLkEThzETa-j1kuuOQQ%3BFfLDUgIdFVy7-SkBW7-20awUhzHzjFEEZed8EQ&oq=colorado&mra=ls&t=m&z=12">
								Colorado Springs
							</LinkExternal>
							, it takes about 43 minutes.
						</li>
						<li>
							From{' '}
							<LinkExternal href="//maps.google.com/maps?saddr=denver,+CO&daddr=602+County+Road+511,+Divide,+CO&hl=en&sll=38.912994,-104.991559&sspn=0.235884,0.528374&geocode=Fd9YXgIdcg---SnPFx8jqoBrhzHWNoon-PSOEQ%3BFfLDUgIdFVy7-SkBW7-20awUhzHzjFEEZed8EQ&mra=ls&t=m&z=10">
								Denver
							</LinkExternal>
							, it takes about 1 hour and 47 minutes.
						</li>
					</List>
				</div>
			</div>
		</Section>
	);
};
