import React, { useEffect, useState } from 'react'
import Layout from "../../layouts/layout.js"
import axios from "axios"

const Login = () => {

  const [token, setToken] = useState(null);

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

      const response = await axios.post(apiUrl, {
        code: authorizationCode,
      });
      const accessToken = response.data.access_token;
      console.log(accessToken);
      setToken(accessToken);
    } catch (error) {
      console.error('Error exchanging code for access token:', error.message);
    }
  };

  const fetchData = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/data`;

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error making API request:', error.message);
    }
  };

  return (
    <>
      <Layout>
        <div>
          {token ? (
            <div>
              <h1>Authenticated!</h1>
              <button onClick={fetchData}>Fetch Data</button>
            </div>
          ) : (
            <a href={`${process.env.REACT_APP_API_URL}/auth`}>Login with Webflow</a>
          )}
        </div>
      </Layout>
    </>
  )
}

export default Login
