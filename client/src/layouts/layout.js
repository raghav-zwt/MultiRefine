import Header from "./header/header.js";
import Footer from "./footer/footer.js";
import SideBar from "./sidebar/sidebar.js"

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
    </>
  );
};

export default Layout;