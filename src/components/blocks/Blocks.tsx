/* Styles */
import './styles/blocks.scss';

/* Packages */
import { useEffect, useRef } from 'react';

/* Scripts */
import { LinkExternalProps, LinkScrollProps, SectionProps } from './scripts/blocks-types';
import { useAppContext } from '../../context/scripts/context-hooks';

/* Components */
import { Icon } from '../icons/Icons';

export const LinkExternal = (props: LinkExternalProps) => {
	const { children, href, ...rest } = props;

	return (
		<a href={href} target="_blank" rel="noreferrer" {...rest}>
			{children}
			<span className="sr-only"> (opens in a new tab)</span>
		</a>
	);
};

export const LinkScroll = (props: LinkScrollProps) => {
	const { children, target, ...rest } = props;
	const { utils } = useAppContext();

	return (
		<button className="pointer unstyled a" type="button" onClick={(e) => utils.scrollTo(e, target)} {...rest}>
			{children}
		</button>
	);
};

export const Section = (props: SectionProps) => {
	const { children, id, label } = props;
	const { utils } = useAppContext();
	const contentOnly = props?.contentOnly ?? false;
	const sectionRef = useRef<HTMLElement>(null);

	// Reveal section with a fade / scroll transition once it comes into view
	useEffect(() => {
		utils.reveal(sectionRef.current, 'section-visible');
	}, [utils]);

	return (
		<section ref={sectionRef} id={id} className="section margin-trim">
			{contentOnly ? null : <h3>{label}</h3>}

			<div className="section-content margin-trim">{children}</div>

			{contentOnly ? null : (
				<div className="section-button">
					<LinkScroll target="#index" aria-label="Back to top button">
						<Icon id={'angle-up'} /> Back to top
					</LinkScroll>
				</div>
			)}
		</section>
	);
};
