import { appWithTranslation } from 'next-i18next';
import '../styles/Home.module.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
