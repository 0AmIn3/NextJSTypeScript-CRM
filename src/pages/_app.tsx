import Layout from "@/Layout/Layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { NextComponentType, NextPageContext } from "next";
import { ReactNode } from "react";
import '../utils/i18n';
interface MyAppProps extends AppProps {
  Component: NextComponentType<NextPageContext, any, any> & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
}



function App({ Component, pageProps }: MyAppProps) {
  
  const getLayout =
    Component.getLayout ||
    ((page: React.ReactNode) => (
      <Layout Company="Example Company">{page}</Layout>
    ));
  return (
    <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
  );
}
export default App;
