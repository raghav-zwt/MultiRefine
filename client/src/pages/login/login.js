import React, { useEffect, useState } from 'react'
import Layout from "../../layouts/layout.js"
import axios from "axios";

const Login = () => {
  const [urlCode, setUrlCode] = useState("")

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');
    if (code) {
      setUrlCode(code)
      webflowAccessToken(code);
    }
    // eslint-disable-next-line
  }, []);

  const webflowAccessToken = async (code) => {
    const URLData = new FormData();
    const url = code; 
    URLData.append("code", url);

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/getAccessToken`,
        URLData
      );

      console.log(data);

      if (data.success) {
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Layout>
        <h1>Login - {urlCode}</h1>
      </Layout>
    </>
  )
}

export default Login
