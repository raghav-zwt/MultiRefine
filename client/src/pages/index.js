import React from 'react'
import Layout from "../layouts/layout.js"

const index = () => {

  const redirectUri = 'https://multirefine-api.onrender.com/login/auth';
  window.location.href = redirectUri;

  return (
    <>
      <Layout>
        <h1>Home</h1>
      </Layout>
    </>
  )
}

export default index
