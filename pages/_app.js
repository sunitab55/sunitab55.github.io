import "../styles/globals.css";
import { Analytics } from "../components/Analytics";

function MyApp({ Component, pageProps }) {
  return (
    <Analytics>
      <Component {...pageProps} />
    </Analytics>
  );
}

export default MyApp;
