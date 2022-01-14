import Image from 'next/image'
import { getStrapiMedia } from "../lib/media";
import placeholder from '../assets/images/placeholder-image.jpeg'

const ImageEl = ({ image }) => {
  const imageUrl = getStrapiMedia(image);
  const imageInfo = image.data ? image.data.attributes : image.attributes;

  return (
    <Image
      src={imageUrl}
      blurDataURL={placeholder}
      alt={imageInfo.alternativeText || imageInfo.name || ''}
      width={imageInfo.width || 150}
      height={imageInfo.height || 150}
      placeholder="blur"
    />
  );
};

export default ImageEl;