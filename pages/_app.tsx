import '../assets/scss/style.scss';
import '../global.css';

import { ApolloClient, ApolloProvider,InMemoryCache } from '@apollo/client';
import App from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { DefaultSeo } from 'next-seo';
import { OpenGraphMedia } from 'next-seo/lib/types';
import { useEffect } from 'react';
import { createContext } from 'react';
import React from 'react';

import {GetSiteSettingsDocument, GetSiteSettingsQuery, GlobalEntity} from '../generated/graphql';
import * as ga from '../lib/ga';

//Start Apollo client
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_STRAPI_API_URL
    ? process.env.NEXT_PUBLIC_STRAPI_API_URL + '/graphql'
    : 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
});

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { siteSettings } = pageProps as {siteSettings: GlobalEntity};
  const router = useRouter();

  //SEO
  const metadata = {
    metaTitle: siteSettings.attributes.websiteName,
    metaDescription: siteSettings.attributes.description,
    shareImage: siteSettings.attributes.shareImage,
  };

  //GA page tracking
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Y001TKEJ77"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        gtag('config', '${process.env.GOOGLE_ANALYTICS}');
          `,
          }}
        />
      </Head>
      <DefaultSeo
        titleTemplate={`%s | ${metadata.metaTitle}`}
        title={undefined}
        defaultTitle={metadata.metaTitle}
        description={metadata.metaDescription}
        openGraph={{
          images: Object.values(
            metadata.shareImage.data.attributes.formats,
          ) as OpenGraphMedia[],
        }}
      />

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js" />

      <GlobalContext.Provider value={siteSettings}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </GlobalContext.Provider>
    </>
  );
};

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);

  try {
    const { data } = await client.query<GetSiteSettingsQuery>({ query: GetSiteSettingsDocument });

    return { ...appProps, pageProps: { siteSettings: data.global.data } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { ...appProps };
  }
};

export default MyApp;
