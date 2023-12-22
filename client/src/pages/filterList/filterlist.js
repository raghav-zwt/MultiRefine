import React, { useEffect } from 'react'
import Layout from "../../layouts/layout.js"
import { Link } from 'react-router-dom'
import axios from "axios";

const FilterList = () => {

    useEffect(() => {
        const getFilterList = async () => {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/userfilter`);
            return data;
        }

        getFilterList();
    }, [])
    
    return (
        <>
            <Layout>
                <div className="page-breadcrumb bg-white">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <h4 className="page-title">Filter Table</h4>
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
                        <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="white-box">
                                <div className="d-md-flex mb-3">
                                    <h3 className="box-title mb-0">Filter List</h3>
                                    <div className="col-md-3 col-sm-4 col-xs-6 ms-auto">
                                        <select className="form-select shadow-none row border-top">
                                            <option>March 2021</option>
                                            <option>April 2021</option>
                                            <option>May 2021</option>
                                            <option>June 2021</option>
                                            <option>July 2021</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table no-wrap">
                                        <thead>
                                            <tr>
                                                <th className="border-top-0">Id</th>
                                                <th className="border-top-0">Project</th>
                                                <th className="border-top-0">Type</th>
                                                <th className="border-top-0">Layout</th>
                                                <th className="border-top-0">Date</th>
                                                <th className="border-top-0">Status</th>
                                                <th className="border-top-0">Collections</th>
                                                <th className="border-top-0">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td className="txt-oflo">Nodejs AWS</td>
                                                <td><span className="">Single</span></td>
                                                <td><span className="">Grid View</span></td>
                                                <td className="txt-oflo">April 18, 2021</td>
                                                <td>
                                                    <span className="btn btn-success text-white">Active</span>
                                                </td>
                                                <td><span className="btn btn-info text-white">1</span></td>
                                                <td className="d-flex align-items-center gap-2">
                                                    <a href='/' className="btn btn-danger d-md-block pull-right waves-effect waves-light text-white"
                                                    >Edit</a
                                                    >
                                                    <a href='/'
                                                        className="btn btn-danger d-md-block pull-right waves-effect waves-light text-white"
                                                    >Delete</a
                                                    >
                                                    <button
                                                        data-bs-toggle="modal"
                                                        type="button"
                                                        data-bs-target="#exampleModalLong"
                                                        className="btn btn-danger d-md-block pull-right waves-effect waves-light text-white"
                                                    >
                                                        Embedded link
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td className="txt-oflo">Nodejs Firebase</td>
                                                <td><span className="">Multiple</span></td>
                                                <td><span className="">List View</span></td>
                                                <td className="txt-oflo">April 18, 2021</td>
                                                <td>
                                                    <span className="btn btn-success text-white">Active</span>
                                                </td>
                                                <td><span className="btn btn-info text-white">4</span></td>
                                                <td className="d-flex align-items-center gap-2">
                                                    <a href='/'
                                                        className="btn btn-danger d-md-block pull-right waves-effect waves-light text-white"
                                                    >Edit</a
                                                    >
                                                    <a href='/'
                                                        className="btn btn-danger d-md-block pull-right waves-effect waves-light text-white"
                                                    >Delete</a
                                                    >
                                                    <button
                                                        data-bs-toggle="modal"
                                                        type="button"
                                                        data-bs-target="#exampleModalLong"
                                                        className="btn btn-danger d-md-block pull-right waves-effect waves-light text-white"
                                                    >
                                                        Embedded link
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td className="txt-oflo">Nodejs Github</td>
                                                <td><span className="">Single</span></td>
                                                <td><span className="">List & Grid View</span></td>
                                                <td className="txt-oflo">April 18, 2021</td>
                                                <td>
                                                    <span className="btn btn-danger text-white"
                                                    >Deactive</span
                                                    >
                                                </td>
                                                <td><span className="btn btn-info text-white">1</span></td>
                                                <td className="d-flex align-items-center gap-2">
                                                    <a href='/'
                                                        className="btn btn-danger d-md-block pull-right waves-effect waves-light text-white"
                                                    >Edit</a
                                                    >
                                                    <a href='/'
                                                        className="btn btn-danger d-md-block pull-right waves-effect waves-light text-white"
                                                    >Delete</a
                                                    >
                                                    <button
                                                        data-bs-toggle="modal"
                                                        type="button"
                                                        data-bs-target="#exampleModalLong"
                                                        className="btn btn-danger d-md-block pull-right waves-effect waves-light text-white"
                                                    >
                                                        Embedded link
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default FilterList
