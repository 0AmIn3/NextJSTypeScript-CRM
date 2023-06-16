import Layout from "@/Layout/Layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
interface MyAppProps extends AppProps {
  Component: {
    getLayout: Function;
  };
}
 function App({ Component, pageProps }: MyAppProps) {
  const getLayout =
    Component.getLayout || ((page: React.ReactNode) => <Layout>{page}</Layout>);
  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}
export default App