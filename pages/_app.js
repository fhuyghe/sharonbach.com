import App from 'next/app'
import { DefaultSeo } from "next-seo"
import Head from "next/head"
import Script from 'next/script'
import "../assets/scss/style.scss";
import { createContext } from "react";
import {fetchAPI} from '../lib/api'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

//Start Apollo client
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_STRAPI_API_URL ? process.env.NEXT_PUBLIC_STRAPI_API_URL + '/graphql' : "http://localhost:1337/graphql",
  cache: new InMemoryCache()
});

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps;

    //SEO
  const metadata = {
    metaTitle: global.data.attributes.websiteName,
    metaDescription: global.data.attributes.description,
    shareImage: global.data.attributes.shareImage,
  };

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css"
        />
      </Head>
      <DefaultSeo
        titleTemplate={`%s | ${metadata.metaTitle}`}
        title={undefined}
        defaultTitle={metadata.metaTitle}
        description={metadata.metaDescription}
        openGraph={{
          images: Object.values(metadata.shareImage.data.attributes.formats).map((image) => {
            return {
              url: image.url,
              width: image.width,
              height: image.height,
            }
          }),
        }}
        twitter={{
          cardType: metadata.twitterCardType,
          handle: metadata.twitterUsername,
        }}
      />
      
      
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js" />

      <GlobalContext.Provider value={global}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </GlobalContext.Provider>
    </>
  );
};

MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const global = await fetchAPI("/api/global?populate=*");
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } };
};

export default MyApp;