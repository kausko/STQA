import type { AppProps } from 'next/app'
import { Provider } from "next-auth/client";
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import Loading from '../components/Loading';
// import Script from 'next/script'

function MyApp(appProps: AppProps) {
  return (
    <Provider session={appProps.pageProps.session}>
      <ChakraProvider resetCSS>
        {/* <Script
          async
          src="https://cdn.jsdelivr.net/npm/jdenticon@3.1.1/dist/jdenticon.min.js"
          integrity="sha384-l0/0sn63N3mskDgRYJZA6Mogihu0VY3CusdLMiwpJ9LFPklOARUcOiWEIGGmFELx"
          crossOrigin="anonymous"
        /> */}
        <Loading {...appProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
