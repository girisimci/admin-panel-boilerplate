import SidebarLayout from "@/layouts/sidebar-layout";
import "@/styles/globals.css";
import "../../i18n";
import { Provider } from "react-redux";
import store from "@/store/store";


function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <SidebarLayout>{page}</SidebarLayout>);

  return getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
