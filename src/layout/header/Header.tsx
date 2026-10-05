/* Styles */
import './styles/header.scss';

/* Scripts */
import { useAppContext } from '@/context/scripts/context-hooks';

export const Header = () => {
	const { variables } = useAppContext();

	return (
		<header className="header">
			<h1 className="header-title">{variables.site.name}</h1>
			<h2 className="sub-title h-text">{variables.site.description}</h2>
		</header>
	);
};
