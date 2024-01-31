import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import "./login.css"
import { UseAuth } from "../../context/AuthContext.js";
import Loader from '../../components/Loader.js';

const Login = () => {

  const [token, setToken] = useState(null);
  const [auth, setAuth] = UseAuth([]);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get('code');

    if (authorizationCode) {
      exchangeCodeForToken(authorizationCode);
    } else if (authorizationCode?.length < 64) {
      toast.error("Webflow authorized code not found, try again.");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const apiUrl = `${process.env.REACT_APP_API_URL}/webflowAuthorizedUser`;
        const tokenApi = token;

        const response = await axios.post(apiUrl, { tokenApi });

        const authorizedData = response.data;

        if (authorizedData) {
          const authInsert = authorizedData?.data?.insertId

          const { email, firstName, lastName } = authorizedData?.webflowAuthorizedUser;

          toast.success('Webflow user authorized, login here.');

          const registerData = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
            id: authInsert,
            email,
            firstName,
            lastName
          });

          if (registerData) {
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error making API request:', error.message);
        toast.error('Webflow user not authorized, login again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, navigate]);

  const exchangeCodeForToken = async (authorizationCode) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/callback`;
    const encodedRedirectUri = `${process.env.REACT_APP_API_URL}/login`;
    const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;
    const grantType = 'authorization_code';

    try {
      setIsLoading(true);

      const response = await axios.post(apiUrl, {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: REACT_APP_CLIENT_SECRET,
        redirect_URI: encodedRedirectUri,
        code: authorizationCode,
        grant_type: grantType,
      });

      const accessToken = response.data.access_token;
      localStorage.setItem('accessToken', accessToken);
      setToken(accessToken);
    } catch (error) {
      console.error('Error exchanging code for access token:', error.message);
      toast.error('Access token not authorized, try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const LoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loginDetails = {
      email,
      password
    }

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/login`, loginDetails);

      try {
        const accessToken = await axios.post(`${process.env.REACT_APP_API_URL}/getToken/${data?.data[0].id}`);

        if (accessToken?.data?.success) {
          localStorage.setItem("accessToken", accessToken?.data?.data[0].access_token);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching access token:", error);
      }

      if (data.success) {
        toast.success(data.message);
        setIsLoading(false);
        setAuth({
          ...auth,
          auth_id: data.data[0].auth_id,
          token: data.token,
        });

        localStorage.setItem("auth", JSON.stringify(data?.data));
        localStorage.setItem("token", JSON.stringify(data?.token));
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="main-wrapper">
        <div className="wrapper">
          <form method="post"
            encType="multipart/form-data" onSubmit={LoginSubmit}>
            <div className="heading">
              <h2>Welcome!</h2>
              <p>Sign In to your account</p>
            </div>
            <div className="input-group">
              <input type="email" value={email} name="email" className="input-field" onChange={(e) => {
                setEmail(e.target.value)
              }} placeholder="email" required />
            </div>
            <div className="input-group">
              <input type="text" value={password} name="password" className="input-field" onChange={(e) => {
                setPassword(e.target.value)
              }} placeholder="password" required />
            </div>
            <div className="input-group mb-3">
              <Link to="https://webflow.com">
                Login With Webflow
              </Link>
            </div>
            <div className="input-group">
              <button type="submit" >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login
