import Header from "./header/header.js";
import Footer from "./footer/footer.js";
import SideBar from "./sidebar/sidebar.js"
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SpeedInsights } from "@vercel/speed-insights/react"

const Layout = ({ children, title, description }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta description={description} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <SideBar />
      <main >
        <div className="page-wrapper">
          {children}
          <SpeedInsights />
        </div>
      </main>
      <Footer />
      <ToastContainer limit={3} />
    </>
  );
};

Layout.defaultProps = {
  title: "MultiRefine Filter",
  description: "MultiRefine Filter",
};

export default Layout;