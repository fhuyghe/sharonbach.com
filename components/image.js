import Image from 'next/image'
import { getStrapiMedia } from "../lib/media";

const ImageEl = ({ image }) => {
  const imageUrl = getStrapiMedia(image);
  const imageInfo = image.data.attributes

  return (
    <Image
      src={imageUrl}
      alt={imageInfo.alternativeText || imageInfo.name}
      width={imageInfo.width || 150}
      height={imageInfo.height || 150}
    />
  );
};

export default ImageEl;