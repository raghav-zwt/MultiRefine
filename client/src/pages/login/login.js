import React, { useEffect, useState } from 'react'
import Layout from "../../layouts/layout.js"

const Login = () => {
  const [urlCode, setUrlCode] = useState("")

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');
    if (code) {
      setUrlCode(code)
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Layout>
        <h1>Login - {urlCode}</h1>
      </Layout>
    </>
  )
}

export default Login
