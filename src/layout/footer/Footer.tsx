/* Styles */
import './styles/footer.scss';

/* Scripts */
import { useAppContext } from '../../context/scripts/context-hooks';

/* Components */
import { Image } from '../../components/image/Image';

export const Footer = () => {
	const { utils } = useAppContext();
	const date = new Date().getFullYear();

	return (
		<footer className="footer container-offset">
			<div className="footer-wrapper">
				<div className="footer-background footer-layout"></div>

				<div className="footer-container footer-layout container-width">
					<div className="flower flower-left">
						<Image alt={'Flower Left'} hasLazy={false} hasWrapper={false} image={'/assets/images/theme/flower-left.png'} />
					</div>

					<div className="footer-copyright">
						&copy; {date}{' '}
						<button
							className="pointer unstyled a"
							type="button"
							aria-label="Scroll to top button"
							onClick={(e) => utils.scrollTo(e, '#index')}
						>
							MattAndAdria.com
						</button>
						<span className="footer-bullet">&bull;</span>Design by{' '}
						<a href="//display.coffee" target="_blank" rel="noreferrer">
							displaycoffee
						</a>
					</div>

					<div className="flower flower-right">
						<Image alt={'Flower Right'} hasLazy={false} hasWrapper={false} image={'/assets/images/theme/flower-right.png'} />
					</div>
				</div>
			</div>
		</footer>
	);
};
