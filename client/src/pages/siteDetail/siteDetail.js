import React, { useEffect, useState } from 'react'
import Layout from "../../layouts/layout.js";
import axios from "axios";
import { toast } from 'react-toastify';
import Loader from "../../assets/images/loader.gif"
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";

const SiteDetail = () => {

    const Bearer = localStorage.getItem("accessToken");
    const [listCollections, setListCollections] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("");
    const [layout, setLayout] = useState("");
    const navigate = useNavigate();
    const [filtername, setFilterName] = useState("");

    const authData = localStorage.getItem("auth");

    const params = useParams();
    const site_id = params.id;

    const handleChangeType = event => {
        setType(event.target.value);
    };

    const handleChangeLayout = event => {
        setLayout(event.target.value);
    };

    useEffect(() => {
        const ListCollections = async () => {
            setLoading(true);
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/ListCollections`, {
                site_id: `${site_id}`,
                Bearer: `${Bearer}`
            });

            if (data.status === 200) {
                setLoading(false);
                setListCollections(data?.data?.collections);
            }

        }
        ListCollections();
    }, [site_id, Bearer])

    const ListCollectionsOptions = listCollections.map(collection => ({
        value: collection.id,
        label: collection.displayName,
    }));

    const filterSend = async (e) => {
        e.preventDefault();
        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0]

            setLoading(true);
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/filter/add`, {
                user_id: JSON.parse(authData)[0].id,
                site_id: site_id,
                name: filtername,
                type: type,
                layout: layout,
                collection: JSON.stringify(selectedOption),
                date: formattedDate
            });
            if (data.data.success) {
                setLoading(false);
                if (data?.data?.message === "Filter already exists") {
                    toast.error(data?.data?.message);
                } else {
                    toast.success(data?.data?.message);
                    navigate("/detail")
                }
            }
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
        }
    }

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
                                <h4 className="page-title">Create Filter</h4>
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
                        <form onSubmit={filterSend} method='post'>
                            <div className="row">
                                <div className="col-lg-4 col-xlg-4 col-md-12">
                                    <div className="w-100 h-100">
                                        <div className="white-box analytics-info h-100">
                                            <h3 className="box-title">Filter Information</h3>
                                            <div className="form-group mb-0 mt-4">
                                                <label htmlFor="FilterName" className="col-md-12 p-0"
                                                >Filter Name</label
                                                >
                                                <div className="col-md-12 border-bottom p-0">
                                                    <input
                                                        type="text"
                                                        placeholder="Filter Name"
                                                        className="form-control p-0 border-0"
                                                        name="FilterName"
                                                        onChange={(e) => {
                                                            setFilterName(e.target.value)
                                                        }}
                                                        id="FilterName"
                                                        required
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
                                                className="d-flex flex-wrap align-items-center mt-4 gap-4">
                                                <div className="form-check d-flex align-items-center gap-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault2"
                                                        value="Single"
                                                        checked={type === 'Single'}
                                                        onChange={handleChangeType}
                                                    />
                                                    <label
                                                        className="form-check-label mb-0"
                                                        htmlFor="flexRadioDefault2"
                                                    >
                                                        Single
                                                    </label>
                                                </div>
                                                <div className="form-check d-flex align-items-center gap-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault1"
                                                        checked={type === 'Multiple'}
                                                        value="Multiple"
                                                        onChange={handleChangeType}
                                                    />
                                                    <label
                                                        className="form-check-label mb-0"
                                                        htmlFor="flexRadioDefault1"
                                                    >
                                                        Multiple
                                                    </label>
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
                                                        checked={layout === 'Grid View'}
                                                        onChange={handleChangeLayout}
                                                    />
                                                    <label
                                                        className="form-check-label mb-0"
                                                        htmlFor="flexRadioDefault3"
                                                    >
                                                        Grid View
                                                    </label>
                                                </div>
                                                <div className="form-check d-flex align-items-center gap-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault-2"
                                                        id="flexRadioDefault4"
                                                        value="List View"
                                                        checked={layout === 'List View'}
                                                        onChange={handleChangeLayout}
                                                    />
                                                    <label
                                                        className="form-check-label mb-0"
                                                        htmlFor="flexRadioDefault4"
                                                    >
                                                        List View
                                                    </label>
                                                </div>
                                                <div className="form-check d-flex align-items-center gap-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault-2"
                                                        id="flexRadioDefault5"
                                                        value="List & Grid View"
                                                        checked={layout === 'List & Grid View'}
                                                        onChange={handleChangeLayout}
                                                    />
                                                    <label
                                                        className="form-check-label mb-0"
                                                        htmlFor="flexRadioDefault5"
                                                    >
                                                        List & Grid View
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-xlg-12 mt-4 col-md-12">
                                    <div className="w-100 h-100">
                                        <div className="white-box analytics-info h-100">
                                            <h3 className="box-title">Webflow Collection</h3>
                                            <Select
                                                className="w-25 w_collection_options"
                                                defaultValue={selectedOption}
                                                onChange={setSelectedOption}
                                                isMulti
                                                required
                                                options={ListCollectionsOptions}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type='submit'
                                className="btn btn-danger mt-4  waves-light text-white"
                            >Create Now</button>
                        </form>
                    </div>
                </Layout>
            )}

        </>
    )
}

export default SiteDetail
