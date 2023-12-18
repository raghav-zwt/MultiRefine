import React from 'react'
import Layout from "../../layouts/layout.js";

const ProfilePage = () => {
  return (
    <>
    <Layout>
    <div className="page-breadcrumb bg-white">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">Profile page</h4>
            </div>
            <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
              <div className="d-md-flex">
                <ol className="breadcrumb ms-auto">
                  <li><a href="/" className="fw-normal">Dashboard</a></li>
                </ol>
                <a
                  href="/"
                  target="_blank"
                  className="btn btn-danger d-none d-md-block pull-right ms-3 hidden-xs hidden-sm waves-effect waves-light text-white"
                  >Create Workflow</a
                >
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-xlg-3 col-md-12">
              <div className="white-box card">
                <img
                  src="plugins/images/users/genu.jpg"
                  className="thumb-lg img-circle"
                  alt="..."
                />
                <ul className="list-group list-group-flush pt-3">
                  <li className="list-group-item px-0">Name - Jenil Gohel</li>
                  <li className="list-group-item px-0">Email - JenilGohel@gmail.com</li>
                  <li className="list-group-item px-0">Phone No - 9909000995</li>
                  <li className="list-group-item px-0">Country - London</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8 col-xlg-9 col-md-12">
              <div className="card">
                <div className="card-body">
                  <form className="form-horizontal form-material">
                    <div className="form-group mb-4">
                      <label className="col-md-12 p-0">Full Name</label>
                      <div className="col-md-12 border-bottom p-0">
                        <input
                          type="text"
                          placeholder="Johnathan Doe"
                          className="form-control p-0 border-0"
                        />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <label for="example-email" className="col-md-12 p-0"
                        >Email</label
                      >
                      <div className="col-md-12 border-bottom p-0">
                        <input
                          type="email"
                          placeholder="johnathan@admin.com"
                          className="form-control p-0 border-0"
                          name="example-email"
                          id="example-email"
                        />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <label className="col-md-12 p-0">Password</label>
                      <div className="col-md-12 border-bottom p-0">
                        <input
                          type="password"
                          value="password"
                          className="form-control p-0 border-0"
                        />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <label className="col-md-12 p-0">Phone No</label>
                      <div className="col-md-12 border-bottom p-0">
                        <input
                          type="text"
                          placeholder="123 456 7890"
                          className="form-control p-0 border-0"
                        />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <label className="col-sm-12">Select Country</label>

                      <div className="col-sm-12 border-bottom">
                        <select
                          className="form-select shadow-none p-0 border-0 form-control-line"
                        >
                          <option>London</option>
                          <option>India</option>
                          <option>Usa</option>
                          <option>Canada</option>
                          <option>Thailand</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className="col-sm-12">
                        <button className="btn btn-success">Update Profile</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
    </>
  )
}

export default ProfilePage
