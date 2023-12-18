import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./login.css"

const Login = () => {

  const [token, setToken] = useState(null);
  const [authorized, setAuthorized] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get('code');
    if (authorizationCode) {
      exchangeCodeForToken(authorizationCode);
    }
  }, []);

  const exchangeCodeForToken = async (authorizationCode) => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/callback`;
      const encodedRedirectUri = `${process.env.REACT_APP_API_URL}/login`;
      const response = await axios.post(apiUrl, {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        redirect_URI: encodedRedirectUri,
        code: authorizationCode,
        grant_type: 'authorization_code',
      });
      const accessToken = response.data.access_token;
      setToken(accessToken);

      if(accessToken) {
        fetchData(accessToken);
      }

    } catch (error) {
      console.error('Error exchanging code for access token:', error.message);
    }
  };

  const fetchData = async (accessToken) => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/webflowAuthorizedUser`;
      const tokenApi = accessToken;
      const response = await axios.post(apiUrl, { tokenApi });
      setAuthorized(response.data);
    } catch (error) {
      console.error('Error making API request:', error.message);
    }
  };

  return (
    <>
      <div className="main-wrapper">
        {authorized}
        <div className="wrapper">

          <div className="heading">
            <h2>Welcome!</h2>
            <p>Sign In to your account</p>
          </div>

          <div className="input-group">
            <input type="text" id="username" className="input-field" placeholder="Username" />
          </div>

          <div className="input-group">
            <input type="password" id="password" className="input-field" placeholder="Password" />
          </div>

          <div className="input-group row">

            <div className="row">
              <input type="checkbox" id="remember" hidden />
              <label htmlFor="remember" className="custom-checkbox"></label>
              <label htmlFor="remember">Remember me?</label>
            </div>

            <div className="row">
              <a href="/" target="_blank">Forgot password?</a>
            </div>
          </div>


          <div className="input-group">
            <button> Login <i className="fa-solid fa-arrow-right"></i></button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login
