import React from 'react';
import { Link } from 'react-router-dom';

const errorPage = () => {

  return (
    <>
      <div className="error-box">
        <div className="error-body text-center">
          <h1 className="error-title text-black">404</h1>
          <h3 className="text-uppercase text-black error-subtitle">PAGE NOT FOUND !</h3>
          <p className="text-black mt-4 mb-4">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
          <Link to={"/"} className="btn btn-danger waves-effect waves-light mb-5 text-white">Back to home</Link>
        </div>
      </div>
    </>
  )
}

export default errorPage
