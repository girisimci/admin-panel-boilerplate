import SidebarLayout from "@/layouts/sidebar-layout";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <SidebarLayout>{page}</SidebarLayout>);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
