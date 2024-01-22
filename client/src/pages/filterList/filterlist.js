import React, { useEffect, useState } from 'react'
import Layout from "../../layouts/layout.js"
import { Link } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify';
import Loader from '../../components/Loader.js';

const FilterList = () => {

    const localStorageAuth = localStorage.getItem("auth");
    const userID = JSON.parse(localStorageAuth)[0].id
    const [filterData, setFilterData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getFilterList = async () => {
        setIsLoading(true);
        try {
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/filter/list`, {
                userID
            });

            if (data?.data?.success) {
                setFilterData(data?.data?.data);
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    const filterRemoveId = async (id) => {
        setIsLoading(true);
        try {
            const data = await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/filter/remove/${id}`
            );
            if (data?.data?.success) {
                toast.success(data?.data?.message);
                getFilterList();
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        getFilterList();
        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Layout title={"Filter List"} description={""}>
                <div className="page-breadcrumb bg-white">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <h4 className="page-title">Filter List</h4>
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
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="white-box">
                                <div className="table-responsive">
                                    <table className="table no-wrap">
                                        <thead>
                                            <tr>
                                                <th className="border-top-0">Filter Name</th>
                                                <th className="border-top-0">Workspace Name</th>
                                                <th className="border-top-0">Type</th>
                                                <th className="border-top-0">Layout</th>
                                                <th className="border-top-0">Date</th>
                                                <th className="border-top-0">Collections</th>
                                                <th className="border-top-0">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Array.isArray(filterData) && filterData.length === 0 ?
                                                    (
                                                        <tr>
                                                            <td className="txt-oflo border-0">Not Found</td>
                                                        </tr>

                                                    ) :
                                                    (
                                                        <>
                                                            {Array.isArray(filterData) && filterData?.map((e) => (
                                                                <>
                                                                    <tr key={e.id}>
                                                                        <td className="txt-oflo">{e.name}</td>
                                                                        <td className="txt-oflo">{e.site_name}</td>
                                                                        <td><span className="">{e.type}</span></td>
                                                                        <td><span className="">{e.layout}</span></td>
                                                                        <td className="txt-oflo">{e.date.split('T')[0]}</td>
                                                                        <td><span className="btn btn-info text-white">{e.collection.length >= 1 ? e.collection.length : 1}</span></td>
                                                                        <td className="d-flex align-items-center gap-2">
                                                                            <Link to={`listdetails/${e.id}`} className="btn btn-danger d-md-block pull-right waves-effect waves-light text-white"
                                                                            >Edit</Link>
                                                                            <button
                                                                                className="btn btn-danger d-md-block pull-right waves-effect waves-light text-white"
                                                                                onClick={(el) => {
                                                                                    el.preventDefault();
                                                                                    filterRemoveId(e.id);
                                                                                }}
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                            <Link
                                                                                to={`/detail/${e.id}?site_id=${e.site_id}`}
                                                                                className="btn btn-danger d-md-block pull-right waves-effect waves-light text-white"
                                                                            >
                                                                                Embedded & Css
                                                                            </Link>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            ))}
                                                        </>
                                                    )
                                            }

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
