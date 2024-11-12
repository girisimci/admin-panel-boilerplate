import SidebarLayout from "@/layouts/sidebar-layout";
import "@/styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <SidebarLayout>
      <Component {...pageProps} />
    </SidebarLayout>
  );
}

export default MyApp;

