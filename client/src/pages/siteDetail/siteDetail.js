import React from 'react'
import Layout from "../../layouts/layout.js";
import { Link } from 'react-router-dom';

const SiteDetail = () => {
    return (
        <>
            <Layout>
                <div className="page-breadcrumb bg-white">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <h4 className="page-title">Filter Step 2</h4>
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
                    <div className="row">
                        <div className="col-lg-4 col-xlg-4 col-md-12">
                            <div className="w-100 h-100">
                                <div className="white-box analytics-info h-100">
                                    <h3 className="box-title">Filter Information</h3>
                                    <div className="form-group mb-0 mt-4">
                                        <label htmlFor="example-email" className="col-md-12 p-0"
                                        >Filter Name</label
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
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xlg-4 col-md-12">
                            <div className="w-100 h-100">
                                <div className="white-box analytics-info h-100">
                                    <h3 className="box-title">Filter Type</h3>
                                    <div
                                        id="filterType"
                                        className="d-flex flex-wrap align-items-center mt-4 gap-4"
                                    >
                                        <div className="form-check d-flex align-items-center gap-2">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault2"
                                                value="Single"
                                                checked
                                            />
                                            <label
                                                className="form-check-label mb-0"
                                                htmlFor="flexRadioDefault2"
                                            >
                                                Single
                                            </label>
                                            <img
                                                src="" alt=''
                                            />
                                        </div>
                                        <div className="form-check d-flex align-items-center gap-2">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="Multiple"
                                            />
                                            <label
                                                className="form-check-label mb-0"
                                                htmlFor="flexRadioDefault1"
                                            >
                                                Multiple
                                            </label>
                                            <img
                                                src="" alt=''
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xlg-4 col-md-12">
                            <div className="w-100 h-100">
                                <div className="white-box analytics-info h-100">
                                    <h3 className="box-title">Filter Layout</h3>
                                    <div
                                        id="filterLayout"
                                        className="d-flex flex-wrap align-items-center mt-4 gap-4"
                                    >
                                        <div className="form-check d-flex align-items-center gap-2">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault-2"
                                                id="flexRadioDefault3"
                                                value="Grid View"
                                                checked
                                            />
                                            <label
                                                className="form-check-label mb-0"
                                                htmlFor="flexRadioDefault3"
                                            >
                                                Grid View
                                            </label>
                                            <img
                                                src="" alt=''
                                            />
                                        </div>
                                        <div className="form-check d-flex align-items-center gap-2">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault-2"
                                                id="flexRadioDefault4"
                                                value="List View"
                                            />
                                            <label
                                                className="form-check-label mb-0"
                                                htmlFor="flexRadioDefault4"
                                            >
                                                List View
                                            </label>
                                            <img
                                                src="" alt=''
                                            />
                                        </div>
                                        <div className="form-check d-flex align-items-center gap-2">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault-2"
                                                id="flexRadioDefault5"
                                                value="List & Grid View"
                                            />
                                            <label
                                                className="form-check-label mb-0"
                                                htmlFor="flexRadioDefault5"
                                            >
                                                List & Grid View
                                            </label>
                                            <img
                                                src="" alt=''
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-xlg-12 mt-4 col-md-12">
                            <div className="w-100 h-100">
                                <div className="white-box analytics-info h-100">
                                    <h3 className="box-title">Webflow Collection</h3>
                                    <select
                                        className="w-25 w_collection_options"
                                        name="states[]"
                                        multiple="multiple"
                                    ></select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link
                        to={"/detail"}
                        className="btn btn-danger mt-4 waves-effect waves-light text-white"
                    >Create Workflow</Link>
                </div>
            </Layout>
        </>
    )
}

export default SiteDetail
