import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import '../styles/global.css';

const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  primaryColor: 'blue',
  primaryShade: 6,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <SWRConfig
        value={{
          fetcher: (url: string) => fetch(url).then(res => res.json()),
          revalidateOnFocus: true,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </MantineProvider>
  );
}
