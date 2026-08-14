/* Styles */
import './styles/container.scss';

/* Scripts */
import { useRespond } from '../../_config/scripts/hooks';
import { useAppContext } from '../../context/scripts/context-hooks';
import { useBodyClass } from './scripts/container-hooks';

/* Components */
import { ErrorBoundary } from '../../components/error-boundary/ErrorBoundary';
import { Navigation } from '../../components/navigation/Navigation';
import { Slideout, SlideoutOverlay } from '../../components/slideout/Slideout';
import { Header } from '../header/Header';
import { Content } from '../content/Content';
import { Footer } from '../footer/Footer';

export const Container = () => {
	const { theme } = useAppContext();
	const isDesktop = useRespond(theme.bps.bp02 as number);

	// Set body class using custom hook
	useBodyClass('home');

	// Slideout options
	const slideoutOptions = {
		id: 'menu',
		isDesktop: isDesktop,
		label: 'Menu',
		button: {
			outside: false,
			show: true,
		},
	};

	return (
		<div className="container">
			<ErrorBoundary message={<ContainerError />}>
				<SlideoutOverlay options={slideoutOptions} />

				<a href="#main-content" className="skip-link sr-only">
					Skip to main content
				</a>

				<Header />

				<div className={'blue-bar container-offset'}>
					{isDesktop ? (
						<Navigation label={'Header Navigation'} />
					) : (
						<Slideout options={slideoutOptions}>
							<Navigation label={'Mobile Navigation'} />
						</Slideout>
					)}
				</div>

				<main id="main-content" className="main container-width">
					<div className="main-layout flex-wrap">
						<Content />
					</div>
				</main>

				<Footer />
			</ErrorBoundary>
		</div>
	);
};

const ContainerError = () => {
	return <p>Something went wrong.</p>;
};
