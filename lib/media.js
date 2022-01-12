export function getStrapiURL(path = "") {
    return `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }${path}`;
  }

export function getStrapiMedia(media) {
  const imageUrl = media ? media.data ? media.data.attributes.url.startsWith("/")
        ? getStrapiURL(media.data.attributes.url)
      : media.data.attributes.url
    : media.attributes ? media.attributes.url : '' : '';
  return imageUrl;
}