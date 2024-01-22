import React, { useState, useEffect } from 'react';
import Layout from "../../layouts/layout.js";
import { Link } from 'react-router-dom';
import axios from "axios";
import Select from 'react-select';
import slugify from "slugify";
import Loader from '../../components/Loader.js';

const SitePage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const Bearer = localStorage.getItem("accessToken");
    const [Site, setSite] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const ListCollectionsOptions = Site.map(collection => ({
        value: collection.id,
        label: collection.displayName,
    }));

    useEffect(() => {
        setIsLoading(true);
        const ListSite = async () => {
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/ListSite`, {
                Bearer: `${Bearer}`
            });

            if (data.status === 200) {
                setSite(data?.data?.sites);
                setIsLoading(false);
            }
        }

        ListSite();
    }, [Bearer])

    const slugifiedLabel = slugify(selectedOption?.label || '');

    const webID = `${selectedOption?.value}/${slugifiedLabel}`;

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Layout title={"Site"} description={""}>
                <div className="page-breadcrumb bg-white">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <h4 className="page-title">Select Site</h4>
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
        </>
    )
}

export default SitePage
