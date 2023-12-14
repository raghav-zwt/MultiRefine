import React from 'react'
import Layout from "../layouts/layout.js"

const index = () => {

  // useEffect(() => {
  //   const getWebflowData = async () => {
  //     const params = new URLSearchParams(window.location.search);
  //     const code = params.get('code');

  //     if (code) {
  //       const response = await axios.get(`http://localhost:3001/webflow-auth?code=${code}`);
  //       const accessToken = response.data.accessToken;

  //       // Now you can use the accessToken to make authorized requests to the Webflow API
  //       console.log('Access Token:', accessToken);
  //     }
  //   };

  //   getWebflowData();
  // }, []);

  return (
    <>
      <Layout>
        <h1>Home</h1>
      </Layout>
    </>
  )
}

export default index
