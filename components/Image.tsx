import Image, { ImageProps } from 'next/image';

import { UploadFile } from '../generated/graphql';
import { getStrapiMedia } from '../lib/media';

interface Props extends Partial<ImageProps> {
  image?: UploadFile | null;
}

const ImageEl = ({ image, ...props }: Props ) => {
  const imageUrl = getStrapiMedia(image);

  return (
    <Image
      src={imageUrl}
      blurDataURL={"assets/images/placeholder-image.jpeg"}
      alt={image.alternativeText || image.name || ''}
      width={image.width || 150}
      height={image.height || 150}
      placeholder="blur"
      {...props}
    />
  );
};

export default ImageEl;
