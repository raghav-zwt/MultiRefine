import Header from "./header/header.js";
import Footer from "./footer/footer.js";
import SideBar from "./sidebar/sidebar.js"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SpeedInsights } from "@vercel/speed-insights/react"

const Layout = ({ children }) => {
  return (
    <>
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

export default Layout;