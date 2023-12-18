import React from 'react';
import Layout from "../../layouts/layout.js";

const SitePage = () => {
    return (
        <>
            <Layout>
                <div className="page-breadcrumb bg-white">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <h4 className="page-title">Filter Step 1</h4>
                        </div>
                        <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
                            <div className="d-md-flex">
                                <ol className="breadcrumb ms-auto">
                                    <li><a href="/" className="fw-normal">Dashboard</a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="d-flex w-100 justify-content-center gap-4">
                        <div className="w-100">
                            <div className="">
                                <div className="white-box analytics-info">
                                    <h3 className="box-title">Select Webflow Site</h3>
                                    <select
                                        className="webflow_site_name form-select shadow-none row border-top"
                                    ></select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a
                        href="cw_step2.html"
                        className="btn btn-danger pull-right waves-effect waves-light text-white"
                        id="ConnectNow"
                    >Connect Now</a
                    >
                </div>
            </Layout>
        </>
    )
}

export default SitePage
