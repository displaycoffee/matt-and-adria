/* Styles */
import './styles/container.scss';

/* Packages */
import { useRef } from 'react';

/* Scripts */
import { useRespond } from '@displaycoffee/scripts/hooks';
import { useAvailableMinHeight, useBodyClass } from '@displaycoffee/scripts/hooks-tanstack';
import { useAppContext } from '../../context/scripts/context-hooks';
import { navigationHeader } from '../../components/navigation/scripts/navigation';

/* Components */
import { ErrorBoundary } from '../../components/error-boundary/ErrorBoundary';
import { Navigation } from '../../components/navigation/Navigation';
import { Slideout } from '../../components/slideout/Slideout';
import { Header } from '../header/Header';
import { Content } from '../content/Content';
import { Footer } from '../footer/Footer';

export const Container = () => {
	const { theme } = useAppContext();
	const isDesktop = useRespond(theme.breakpoints.md);
	const mainRef = useRef<HTMLElement>(null);
	useAvailableMinHeight(mainRef);

	// Set body class using custom hook
	useBodyClass('index');

	// Slideout options
	const slideoutOptions = {
		id: 'menu',
		label: 'Menu',
	};

	return (
		<div className="container">
			<ErrorBoundary message={<ContainerError />}>
				<a href="#main-content" className="skip-link sr-only no-decoration">
					Skip to main content
				</a>

				<Header />

				<div className={'blue-bar container-offset'}>
					{isDesktop ? (
						<Navigation data={navigationHeader} label={'Header Navigation'} />
					) : (
						<Slideout options={slideoutOptions}>
							<Navigation data={navigationHeader} label={'Mobile Navigation'} />
						</Slideout>
					)}
				</div>

				<main id="main-content" className="main container-width" ref={mainRef}>
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
