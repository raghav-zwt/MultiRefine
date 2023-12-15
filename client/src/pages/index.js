import React from 'react'
import Layout from "../layouts/layout.js"

const index = () => {

  const response = fetch(`${process.env.REACT_APP_API_URL}/authorize`);
  window.location.href = response;

  return (
    <>
      <Layout>
        <h1>Home</h1>
      </Layout>
    </>
  )
}

export default index
