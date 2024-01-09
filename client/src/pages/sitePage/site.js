import React, { useState, useEffect } from 'react';
import Layout from "../../layouts/layout.js";
import { Link } from 'react-router-dom';
import axios from "axios";
import Loader from "../../assets/images/loader.gif";
import Select from 'react-select';

const SitePage = () => {

    const Bearer = localStorage.getItem("accessToken");
    const [Site, setSite] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const ListCollectionsOptions = Site.map(collection => ({
        value: collection.id,
        label: collection.displayName,
    }));

    const webID = selectedOption?.value;

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
                                <h4 className="page-title">Select Site</h4>
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
                        <div className="d-flex w-100 justify-content-center gap-4">
                            <div className="w-100">
                                <div className="">
                                    <div className="white-box analytics-info">
                                        <h3 className="box-title">Select Webflow Site</h3>
                                        <Select
                                            className="webflow_site_name"
                                            options={ListCollectionsOptions}
                                            required
                                            defaultValue={selectedOption}
                                            onChange={setSelectedOption}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link
                            to={`/sitedetails/${webID}`}
                            className="btn btn-danger pull-right waves-light text-white"
                            id="ConnectNow"
                        >Connect Now</Link>
                    </div>
                </Layout>
            )}
        </>
    )
}

export default SitePage
