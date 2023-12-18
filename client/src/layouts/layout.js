import Header from "./header/header.js";
import Footer from "./footer/footer.js";
import SideBar from "./sidebar/sidebar.js"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <SideBar />
      <main >
        <div className="page-wrapper">
          {children}
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Layout;