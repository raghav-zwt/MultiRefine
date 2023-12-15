import React from 'react'
import Layout from "../../layouts/layout.js"

const Login = () => {

  const clientId = 'YOUR_WEBFLOW_CLIENT_ID';
  const redirectUri = 'http://localhost:3000/webflow-auth';
  const webflowAuthUrl = `https://webflow.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  window.location.href = webflowAuthUrl;
  
  return (
    <>
      <Layout>
        <h1>Login</h1>
      </Layout>
    </>
  )
}

export default Login
