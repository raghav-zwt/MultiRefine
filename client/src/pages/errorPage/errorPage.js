import React from 'react'

const errorPage = () => {
  return (
    <>
      <div class="error-box">
        <div class="error-body text-center">
          <h1 class="error-title text-black">404</h1>
          <h3 class="text-uppercase text-black error-subtitle">PAGE NOT FOUND !</h3>
          <p class="text-black mt-4 mb-4">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
          <a href="/" class="btn btn-danger waves-effect waves-light mb-5 text-white">Back to home</a>
        </div>
      </div>
    </>
  )
}

export default errorPage
