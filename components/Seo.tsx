import { NextSeo } from 'next-seo';
import { UploadFileEntityResponse } from '../generated/graphql';
import { getStrapiMedia } from '../lib/media';

type Props = {
  metadata: {
    metaTitle: string;
    metaDescription: string;
    shareImage: UploadFileEntityResponse;
  };
};

const Seo = ({ metadata }: Props) => {
  // Prevent errors if no metadata was set
  if (!metadata) return null;

  return (
    <NextSeo
      title={metadata.metaTitle}
      description={metadata.metaDescription}
      openGraph={{
        // Title and description are mandatory
        title: metadata.metaTitle,
        description: metadata.metaDescription,
        // Only include OG image if we have it
        // Careful: if you disable image optimization in Strapi, this will break
        ...(metadata.shareImage && {
          images: Object.values(metadata.shareImage.data.attributes).map(
            (image) => {
              return {
                url: getStrapiMedia(image.url),
                width: image.width,
                height: image.height,
              };
            },
          ),
        }),
      }}
    />
  );
};

export default Seo;
