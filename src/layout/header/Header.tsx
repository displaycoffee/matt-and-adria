/* Styles */
import './styles/header.scss';

/* Packages */
import { Link } from 'react-router-dom';

export const Header = () => {
	return (
		<header className="header">
			<h1>
				<Link to="/">Matt and Adria</Link>
			</h1>
			<h2>Our Wedding Website</h2>
		</header>
	);
};
