import React, { useEffect, useState } from 'react'
import Layout from "../../layouts/layout.js"
import axios from "axios"

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
    } catch (error) {
      console.error('Error exchanging code for access token:', error.message);
    }
  };

  const fetchData = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/webflowAuthorizedUser`;
      const tokenApi = token;
      const response = await axios.post(apiUrl, { tokenApi });
      setAuthorized(response.data);
    } catch (error) {
      console.error('Error making API request:', error.message);

      
    }
  };

  return (
    <>
      <Layout>
        <div>
          {token ? (
            <>
              <div>
                {authorized.firstName}
              </div>
              <div>
                {authorized.lastName}
              </div>
              <div>
                {authorized.id}
              </div>
              <div>
                {authorized.email}
              </div>
              <div>
                <h1>Authenticated!</h1>
                <button onClick={fetchData}>Authorized User</button>
              </div>
            </>
          ) : (
            <a href={`${process.env.REACT_APP_API_URL}/auth`}>Login with Webflow</a>
          )}
        </div>
      </Layout>
    </>
  )
}

export default Login
