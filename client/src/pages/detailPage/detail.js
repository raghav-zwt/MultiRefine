import React from 'react'
import Layout from "../../layouts/layout.js";
import { Link } from 'react-router-dom';

const DetailPage = () => {

    return (
        <>
            <Layout>
                <div className="page-breadcrumb bg-white">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <h4 className="page-title">Filter Details</h4>
                        </div>
                        <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
                            <div className="d-md-flex">
                                <ol className="breadcrumb ms-auto">
                                    <li><Link to={"/"} className="fw-normal">Dashboard</Link></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-xlg-3 col-md-12">
                            <div className="white-box">
                                <div className="user-bg">
                                    <div className="overlay-box">
                                        <div className="p-4 text-start">
                                            <h4 className="text-white mt-2">Shortcut Tools</h4>
                                            <h5 className="text-white mt-2">info@myadmin.com</h5>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="user-btm-box mt-5 justify-content-center align-items-center flex-wrap gap-2 d-md-flex"
                                >
                                    <button
                                        type="button"
                                        className="btn btn-danger pull-right waves-effect waves-light text-white"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModalLong"
                                    >
                                        Embadded Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">CSS</div>
                        <div className="card-body">
                            <textarea className='w-100 p-4' placeholder='Enter css' rows={10}>
                            </textarea>
                            <button className='btn btn-danger pull-right waves-effect waves-light text-white'>Add</button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default DetailPage
