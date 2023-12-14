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
      webflowAccessToken();
    }
    // eslint-disable-next-line
  }, []);

  const webflowAccessToken = async () => {
    const formData = new FormData();
    formData.append("code", urlCode);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_JGAPI_V1}/blog/add`,
        formData
      );

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
