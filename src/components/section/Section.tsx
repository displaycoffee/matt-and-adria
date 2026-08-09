/* Styles */
import './styles/section.scss';

/* Scripts */
import { SectionProps } from './scripts/section-types';
import { useAppContext } from '../../context/scripts/context-hooks';

/* Components */
import { Icon } from '../icons/Icons';

export const Section = (props: SectionProps) => {
	const { children, id, label } = props;
	const { utils } = useAppContext();
	const showHeader = props?.showHeader ?? true;

	return (
		<section id={id} className="section margin-trim">
			{showHeader ? <h3>{label}</h3> : null}

			<div className="section-content">{children}</div>

			<div className="section-button">
				<button className="pointer unstyled a" type="button" aria-label="Back to top button" onClick={(e) => utils.scrollTo(e, '#index')}>
					<Icon id={'angle-up'} /> Back to top
				</button>
			</div>
		</section>
	);
};
