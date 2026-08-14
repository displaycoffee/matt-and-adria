/* Styles */
import './styles/footer.scss';

/* Scripts */
import { useAppContext } from '../../context/scripts/context-hooks';
import { useRespond } from '../../_config/scripts/hooks';

/* Components */
import { LinkExternal, LinkScroll } from '../../components/blocks/Blocks';
import { Image } from '../../components/image/Image';

export const Footer = () => {
	const { theme } = useAppContext();
	const date = new Date().getFullYear();
	const isDesktop = useRespond(theme.bps.bp02 as number);

	return (
		<footer className="footer container-offset">
			<div className="footer-background">
				<div className="footer-background-top"></div>

				<div className="footer-background-middle"></div>

				<div className="footer-background-bottom"></div>
			</div>

			<div className="footer-container container-width">
				<div className={`row row-auto row-nowrap row-align-items-center row-spacing-${isDesktop ? '20' : '10'}`}>
					<div className="column footer-flower footer-flower-left">
						<Image alt={''} hasLazy={true} hasWrapper={false} image={'/assets/images/theme/flower-left.png'} />
					</div>

					<div className="column footer-content">
						<div className="footer-copyright">
							&copy; {date}{' '}
							<LinkScroll target="#index" aria-label="Scroll to top button">
								MattAndAdria.com
							</LinkScroll>
							<span className="footer-bullet">&bull;</span>Design by <LinkExternal href="//display.coffee">displaycoffee</LinkExternal>
						</div>
					</div>

					<div className="column footer-flower footer-flower-right">
						<Image alt={''} hasLazy={true} hasWrapper={false} image={'/assets/images/theme/flower-right.png'} />
					</div>
				</div>
			</div>
		</footer>
	);
};
