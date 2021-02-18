
import App from 'next/app';
import Head from 'next/head';
import { Provider } from '@shopify/app-bridge-react'
import translations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import Cookies from 'js-cookie';

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        const config = {
            apiKey: API_KEY,
            shopOrigin: Cookies.get('shopOrigin'),
            forceRedirect: true
        }

        return (
            <>
                <Head>
                    <title>SampleApp</title>
                    <meta charSet="utf-8" />
                </Head>

                <Provider config={config}>
                    <AppProvider i18n={translations}>
                        <Component {...pageProps} />
                    </AppProvider>
                </Provider>
            </>
        )
    }
}

export default MyApp;