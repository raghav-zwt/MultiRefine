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
      const encodedRedirectUri = `${process.env.REACT_APP_API_URL}/login`;

      const response = await axios.post(apiUrl, {
        client_id: "b58d8c02048a8a3f58c8e1a04144490b5b6b202db956a8d5ab0da2a2ce40b9f4",
        client_secret: "cd193df6bf7332ce5c0793ac09d048613ac9c85284779dfb43710bbde9f23d91",
        redirect_URI: encodedRedirectUri,
        code: authorizationCode,
        grant_type: 'authorization_code',
      });

      const accessToken = response.data.access_token;

      console.log(response);

      console.log("===================>", accessToken);
      setToken(accessToken);
    } catch (error) {
      console.error('Error exchanging code for access token:', error.message);
    }
  };

  const fetchData = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/webflowAuthorizedUser`;
  
      const tokenApi = token;

      console.log("===================>", tokenApi);
  
      const response = await axios.post(apiUrl, { tokenApi });
  
      console.log(response.data)
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
