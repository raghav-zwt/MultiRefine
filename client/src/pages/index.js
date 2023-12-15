import React, { useEffect } from 'react'
import Layout from "../layouts/layout.js"

const index = () => {

  useEffect(() => {
    const redirectToAuthorization = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/authorize`);
        const { authorizationUrl } = await response.json();

        window.location.href = authorizationUrl;
      } catch (error) {
        console.error('Error fetching authorization URL:', error);
      }
    };

    redirectToAuthorization();
  }, []);

  return (
    <>
      <Layout>
        <h1>Home</h1>
      </Layout>
    </>
  )
}

export default index
