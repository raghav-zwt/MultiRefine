import React, { useEffect, useState } from 'react'
import Layout from "../../layouts/layout.js"
import axios from "axios";

const Login = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL) 
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Layout>
        <h1>Login - {data}</h1>
      </Layout>
    </>
  )
}

export default Login
