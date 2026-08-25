/* Styles */
import './styles/forms.scss';

/* Scripts */
import { ButtonProps, ButtonScrollProps } from './scripts/forms-types';
import { forms } from './scripts/forms';
import { useAppContext } from '../../context/scripts/context-hooks';

export const Button = (props: ButtonProps) => {
	const { children, className: propClassName, hideLabel = false, label, type = 'button', variant = 'primary', ...rest } = props;
	const buttonClass = variant != 'unstyled' && variant != 'link' ? 'button ' : '';
	const variantClass = variant == 'link' ? `button-${variant} button-unstyled a` : `button-${variant}`;
	const disabledClass = rest?.disabled ? ' button-disabled' : '';
	const className = forms.build.className(`${buttonClass}${variantClass}${disabledClass} pointer`, propClassName);

	return (
		<button className={className} type={type} aria-label={hideLabel ? label : undefined} {...rest}>
			{children}
			{hideLabel ? null : <span className="button-label">{label}</span>}
		</button>
	);
};

export const ButtonScroll = (props: ButtonScrollProps) => {
	const { offset = 0, target, ...rest } = props;
	const { utils } = useAppContext();

	return <Button variant="link" onClick={(e) => utils.scrollTo(e, target, offset)} {...rest} />;
};
