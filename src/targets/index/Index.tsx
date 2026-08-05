/* Scripts */
import { index } from './scripts';

/* Components */
import { ContextProvider } from '../../context/Context';
import { Container } from '../../layout/container/Container';

/* Index component */
const Index = () => {
	return (
		<ContextProvider>
			<Container />
		</ContextProvider>
	);
};

/* Create main target entry point */
index.renderTarget('#index', <Index />);
