import React, { useEffect } from 'react'
import Layout from "../../layouts/layout.js"

const Login = () => {

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
    redirectToAuthorization();
  }, []);

  return (
    <>
      <Layout>
        <h1>Login</h1>
      </Layout>
    </>
  )
}

export default Login
