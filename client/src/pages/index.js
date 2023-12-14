import React from 'react'
import Layout from "../layouts/layout.js"

const index = () => {

  const clientId = 'b58d8c02048a8a3f58c8e1a04144490b5b6b202db956a8d5ab0da2a2ce40b9f4';
  const redirectUri = 'https://multirefine-api.onrender.com/login/auth';
  const authorizationUrl = `https://webflow.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=write`;
  window.location.href = authorizationUrl;

  return (
    <>
      <Layout>
        <h1>Home</h1>
      </Layout>
    </>
  )
}

export default index
