import React, { useEffect, useState } from 'react';
import Layout from "../layouts/layout.js"
import { Link } from 'react-router-dom';
import axios from "axios";
import slugify from "slugify";
import Loader from '../components/Loader.js';
import { toast } from "react-toastify";

const HomePage = () => {

  const Bearer = localStorage.getItem("accessToken");
  const [Site, setSite] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const ListSite = async () => {
      try {
        const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/ListSite`, {
          Bearer: `${Bearer}`
        });

        if (data.status === 200) {
          setSite(data?.data?.sites);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error?.message);
        setIsLoading(false);
      }
    }

    ListSite();
  }, [Bearer])

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Layout title={"Home"} description={""}>
        <div className="page-breadcrumb bg-white">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">Dashboard</h4>
            </div>
            <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
              <div className="d-flex gap-3 justify-content-end ms-auto">
                <Link to={"/site"} className="btn btn-primary fw-normal">Create Filter</Link>
                <Link to={"/"} className="btn btn-primary fw-normal">Dashboard</Link>
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
                      to={`/sitedetails/${e.id}/${slugify(e.displayName)}`}
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
    </>
  )
}

export default HomePage
