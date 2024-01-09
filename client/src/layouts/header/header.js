import React from 'react'
import LogoText from "../../assets/images/ample.png";
import Logo from "../../assets/images/ample-icon.png";
import User from "../../assets/images/user.png"
import cookie from "js-cookie"
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const Navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    cookie.remove('auth');
    Navigate("/login")
  }

  const LoginStyle = {
    "width": "40px",
    "height": "40px",
    "borderRadius" : "100px"
  }

  return (
    <>
      <header className="topbar" data-navbarbg="skin5">
        <nav className="navbar top-navbar navbar-expand-md navbar-dark">
          <div className="navbar-header" data-logobg="skin6">
            <Link className="navbar-brand" to={"/"}>
              <b className="logo-icon">
                <img src={Logo} alt="homepage" />
              </b>
              <span className="logo-text">
                <img src={LogoText} alt="homepage" />
              </span>
            </Link>
            <a className="nav-toggler waves-effect waves-light text-dark d-block d-md-none" href='/'><i className="ti-menu ti-close"></i></a>
          </div>
          <div className="mx-4 ms-auto dropdown">
            <button style={LoginStyle} className="border-0 dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img className='w-100 h-100 object-fit-cover' src={User} alt='user' />
            </button>
            <div className="dropdown-menu pb-0 dropdown-menu-end" aria-labelledby="dropdownMenuButton">
              <Link className="dropdown-item" to={"/profile"}>Profile</Link>
              <div className="dropdown-item" onClick={logout} >Logout</div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
