import { UploadFile } from "../generated/graphql";

export function getStrapiURL(path = '') {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
  }${path}`;
}

export function getStrapiMedia(media: UploadFile) {
  const imageUrl = media?.url ?? '';

  return imageUrl.startsWith('/') ? getStrapiURL(imageUrl) : imageUrl;
}
