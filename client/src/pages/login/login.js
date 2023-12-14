import React, { useEffect } from 'react'
import Layout from "../../layouts/layout.js"
import axios from "axios";

const Login = ({ location }) => {
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (code) {
      // Exchange the authorization code for an access token
      axios
        .post('https://webflow.com/oauth/token', {
          code,
          client_id: "b58d8c02048a8a3f58c8e1a04144490b5b6b202db956a8d5ab0da2a2ce40b9f4",
          client_secret: "cd193df6bf7332ce5c0793ac09d048613ac9c85284779dfb43710bbde9f23d91",
          redirect_uri: "https://multirefine-api.onrender.com/login/auth",
          grant_type: 'authorization_code',
        })
        .then((response) => {
          const accessToken = response.data.access_token;

          // Use the accessToken to make API requests to Webflow
          console.log('Access Token:', accessToken);
        })
        .catch((error) => {
          console.error('Error exchanging code for token:', error);
        });
    }
  }, [location.search]);

  return (
    <>
      <Layout>
        <h1>Login - {urlCode}</h1>
      </Layout>
    </>
  )
}

export default Login
