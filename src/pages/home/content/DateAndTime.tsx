// /* Styles */
// import './styles/dropdown.scss';

// /* Packages */
// import { useEffect, useRef, useState } from 'react';

/* Scripts */
import { HomeProps } from '../scripts/home-types';

/* Components */
import { Section } from '../../../components/section/Section';

export const DateAndTime = (props: HomeProps) => {
	const { id, label } = props;

	return (
		<Section id={id} label={label}>
			DateAndTime
		</Section>
	);
};
