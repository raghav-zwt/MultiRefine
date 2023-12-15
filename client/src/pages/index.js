import React, { useEffect } from 'react';
import Layout from "../layouts/layout.js"

const HomePage = () => {

  useEffect(() => {
    const redirectToAuthorization = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/webflow-auth/authorize`);

        if (!response.ok) {
          throw new Error(`Failed to fetch authorization URL. Status: ${response.status}`);
        }

        const { authorizationUrl } = await response.json();
        window.location.href = authorizationUrl;
      } catch (error) {
        console.error('Error fetching authorization URL:', error);
      }
    };

    // Call the function to initiate the redirection
    redirectToAuthorization();
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  return (
    <>
      <Layout>
        <h1>Home</h1>
      </Layout>
    </>
  )
}

export default HomePage
