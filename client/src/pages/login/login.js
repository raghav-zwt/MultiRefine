import React, { useEffect, useState } from 'react'
import Layout from "../../layouts/layout.js"
import axios from "axios";
import "./login.css"

const Login = () => {
  const [urlCode, setUrlCode] = useState("")
  console.log(urlCode);
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');
    if (code) {
      setUrlCode(code)
      webflowAccessToken(code);
    }
    // eslint-disable-next-line
  }, []);

  const webflowAccessToken = async (code) => {
    const URLData = new FormData();
    const url = code; 
    URLData.append("code", url);

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/getAccessToken`,
        URLData
      );

      console.log(data);

      if (data.success) {
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Layout>
      <div className="container-login100">
      <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
        <form id="loginForm" className="login100-form validate-form">
          <span className="login100-form-title p-b-49"> Login </span>
          <div
            className="wrap-input100 validate-input m-b-23"
            data-validate="Username is reauired"
          >
            <span className="label-input100">email</span>
            <input
              className="input100"
              type="email"
              id="email"
              name="email"
              placeholder="Type your email address"
            />
            <span className="focus-input100" data-symbol=""></span>
          </div>
          <div
            className="wrap-input100 validate-input"
            data-validate="Password is required"
          >
            <span className="label-input100">password</span>
            <input
              className="input100"
              type="Password"
              id="Password"
              name="Password"
              placeholder="Type your password"
            />
            <span className="focus-input100" data-symbol=""></span>
          </div>
          <div className="text-right p-t-31 p-b-31">
            <a href > Forgot password? </a>
          </div>
          <div className="container-login100-form-btn">
            <div className="wrap-login100-form-btn">
              <div className="login100-form-bgbtn"></div>
              <button type="submit" className="login100-form-btn">Login</button>
            </div>
          </div>
          <div className="text-center validCheck d-none p-t-31 p-b-0"></div>
        </form>
      </div>
    </div>
      </Layout>
    </>
  )
}

export default Login
