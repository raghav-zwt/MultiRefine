import React, { useEffect, useState } from 'react';
import Layout from "../layouts/layout.js"
import "../assets/js/homepage.js";
import { Link } from 'react-router-dom';
import Loader from "../assets/images/loader.gif"
import axios from "axios";

const HomePage = () => {

  const Bearer = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(false);
  const [Site, setSite] = useState([]);

  useEffect(() => {
    const ListSite = async () => {
      setLoading(true);
      const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/ListSite`, {
        Bearer: `${Bearer}`
      });

      if (data.status === 200) {
        setLoading(false);
        setSite(data?.data?.sites);
      }
    }

    ListSite();
  }, [Bearer])

  return (
    <>
      {loading ? (
        <div className='Loader-style'>
          <img src={Loader} width={80} height={80} alt="loading..." />
        </div>
      ) : (
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
            <h3 className="page-title pb-3">Webflow Site</h3>
            <div className="row" id="recent-workflows">
              {Array.isArray(Site) && Site.map((e) => (
                <div key={e.id} className="col-lg-4 col-xlg-3 col-md-12 recent-workflows-item">
                  <div className="white-box">
                    <h3 className="mt-2 mb-3 box-title">{e.displayName}</h3>
                    <h5 className="mt-2">
                      <b>SiteId</b> - {e.id}
                    </h5>
                    <h5 className="mt-2">
                      <b>lastUpdated</b> - {new Date(e.lastUpdated).toLocaleDateString()}
                    </h5>
                    <div
                      className="user-btm-box mt-5 justify-content-center align-items-center d-md-flex"
                    >
                      <Link
                        to={`/sitedetails/${e.id}`}
                        className="btn btn-primary pull-right me-auto waves-effect waves-light text-white"
                      >
                        Select Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
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
      )}
    </>
  )
}

export default HomePage
