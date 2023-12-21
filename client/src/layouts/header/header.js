import React from 'react'
import LogoText from "../../assets/images/ample.png";
import Logo from "../../assets/images/ample-icon.png";
import cookie from "js-cookie"
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const Navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    cookie.remove('auth');
    Navigate("/login")
  }

  return (
    <>
      <header className="topbar" data-navbarbg="skin5">
        <nav className="navbar top-navbar navbar-expand-md navbar-dark">
          <div className="navbar-header" data-logobg="skin6">
            <a className="navbar-brand" href="index.html">
              <b className="logo-icon">
                <img src={Logo} alt="homepage" />
              </b>
              <span className="logo-text">
                <img src={LogoText} alt="homepage" />
              </span>
            </a>
            <a className="nav-toggler waves-effect waves-light text-dark d-block d-md-none" href="/"><i className="ti-menu ti-close"></i></a>
          </div>
          <button className='ms-auto text-white btn btn-danger mx-4' onClick={logout}>Logout</button>
        </nav>
      </header>
    </>
  )
}

export default Header
