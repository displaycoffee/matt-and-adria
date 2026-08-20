/* Scripts */
import { HomeProps } from '../scripts/home-types';
import { photos } from '../scripts/photos';

/* Components */
import { Section } from '../../../components/blocks/Blocks';
import { Gallery } from '../../../components/gallery/Gallery';

export const Photos = (props: HomeProps) => {
	const { id, title } = props;

	return (
		<Section id={id} title={title}>
			<p>
				<strong>Note:</strong> To protect the privacy of others, not all wedding photos are listed here. Rest assured, we have plenty of
				pictures of drunk and happy folk.
			</p>

			{photos && photos.length !== 0 ? <Gallery images={photos} /> : null}
		</Section>
	);
};
