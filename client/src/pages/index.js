import React from 'react';
import Layout from "../layouts/layout.js"
import "../assets/js/homepage.js";
import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
    <>
      <Layout>
        <div className="page-breadcrumb bg-white">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">Dashboard</h4>
            </div>
            <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
              <div className="d-md-flex">
                <ol className="breadcrumb ms-auto">
                  <li><Link to={"/"} className="fw-normal">Dashboard</Link></li>
                </ol>
                <Link
                  to={"/site"}
                  className="btn btn-danger d-none d-md-block pull-right ms-3 hidden-xs hidden-sm waves-effect waves-light text-white"
                >Create Workflow</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <h3 className="page-title pb-3">Recent Filter</h3>
          <div className="row" id="recent-workflows">
            <div className="col-lg-4 col-xlg-3 col-md-12 recent-workflows-item">
              <div className="white-box position-relative">
                <button type="button" className="btn text-white fw-bold position-absolute top-0 end-0 ">
                  Active
                </button>
                <div className="user-bg m-0">
                  <div className="overlay-box">
                    <div className="p-4 text-start h-100 overflow-auto">
                      <h4 className="text-white mt-2">dasda</h4>
                      <h5 className="text-white mt-4">
                        Collections
                        <span className="ms-2 btn btn-info pull-right me-auto waves-effect waves-light text-white">
                          54
                        </span>
                      </h5>
                      <h5 className="text-white mt-4">
                        Layout
                        <span className="ms-2 btn btn-info pull-right me-auto waves-effect waves-light text-white">
                          Grid
                        </span>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="user-btm-box gap-3  mt-4 align-items-center d-flex flex-wrap">
                  <Link to={"/detail"} className="btn btn-danger pull-right me-auto waves-effect waves-light text-white">
                    Details
                  </Link>
                  <h6 className="mb-0">Created 54/76/678</h6>
                </div>
              </div>
            </div>
          </div>
          <h3 className="page-title pb-3">Create a filter</h3>
          <div className="row">
            <div className="col-lg-4 col-xlg-3 col-md-12">
              <div className="white-box">
                <h3 className="mt-2 mb-3 box-title">Collection sync</h3>
                <h5 className="mt-2">
                  Keep your Webflow CMS Items in sync with your Airtable base
                  with a single click.
                </h5>
                <div
                  className="user-btm-box mt-5 justify-content-center align-items-center d-md-flex"
                >
                  <Link
                    to={"/site"}
                    className="btn btn-danger pull-right me-auto waves-effect waves-light text-white"
                  >
                    Create filter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default HomePage
