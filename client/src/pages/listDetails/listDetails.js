import React, { useEffect, useState } from 'react';
import Loader from "../../assets/images/loader.gif";
import { Link, useParams } from "react-router-dom";
import Layout from "../../layouts/layout.js";
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const ListDetails = () => {
    const [loading, setLoading] = useState(false);
    const [siteId, setSiteId] = useState("")
    const [listCollections, setListCollections] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedUniqueOption, setSelectedUniqueOption] = useState(null);
    const [uniqueFieldsData, setuniqueFieldsData] = useState([]);
    const Bearer = localStorage.getItem("accessToken");
    const params = useParams();
    const [filtername, setFilterName] = useState("");
    const [type, setType] = useState("");
    const [layout, setLayout] = useState("");
    const navigate = useNavigate();

    console.log(selectedUniqueOption)

    useEffect(() => {
        const filterFetch = async () => {
            try {
                const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/filter/listDetails/${params.id}`);

                if (data?.data?.success) {
                    setFilterName(data?.data?.data[0].name)
                    setSiteId(data?.data?.data[0].site_id);
                    setType(data?.data?.data[0].type);
                    setLayout(data?.data?.data[0].layout);
                    setSelectedOption(data?.data?.data[0].collection)
                    setSelectedUniqueOption(data?.data?.data[0].collection_category)

                    if (siteId) {
                        const ListCollections = async () => {
                            setLoading(true);
                            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/ListCollections`, {
                                site_id: `${siteId}`,
                                Bearer: `${Bearer}`
                            });

                            if (data.status === 200) {
                                setLoading(false);
                                setListCollections(data?.data?.collections);
                            }
                        }
                        ListCollections();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        filterFetch();
    }, [params, siteId, Bearer]);

    const ListCollectionsOptions = listCollections.map(collection => ({
        value: collection.id,
        label: collection.displayName,
    }));

    const handleChangeType = event => {
        setType(event.target.value);
    };

    const handleChangeLayout = event => {
        setLayout(event.target.value);
    };

    const authData = localStorage.getItem("auth");

    const filterUpdate = async (e) => {
        e.preventDefault()
        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0]

            setLoading(true);
            const data = await axios.put(`${process.env.REACT_APP_API_URL}/api/filter/filterUpdate/${params.id}`, {
                user_id: JSON.parse(authData)[0].id,
                id: params.id,
                name: filtername,
                type: type,
                layout: layout,
                collection: JSON.stringify(selectedOption),
                collection_category: JSON.stringify(selectedUniqueOption),
                date: formattedDate
            });

            if (data.data.success) {
                setLoading(false);
                if (data?.data?.message === "Filter already exists") {
                    toast.error(data?.data?.message);
                } else {
                    toast.success(data?.data?.message);
                    navigate("/list")
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setLoading(false);
        }
    }

    const FilterFields = async (e) => {
        e.preventDefault();
        const selectedOptionValue = selectedOption;
        try {
            let collectionData;
            if (Array.isArray(selectedOptionValue)) {
                collectionData = await Promise.all(selectedOptionValue.map(async (collection) => {
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/ListCollectionItems`, {
                        collection_id: collection.value,
                        Bearer: `${Bearer}`
                    });
                    return response?.data?.items;
                }));
            } else {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/ListCollectionItems`, {
                    collection_id: selectedOptionValue.value,
                    Bearer: `${Bearer}`
                });
                collectionData = [response?.data?.items];
            }
            const siteCollectionData = collectionData.reduce((acc, val) => acc.concat(val), []);

            const uniqueFields = new Set();

            siteCollectionData.map(async function (item) {
                const fieldData = item?.fieldData;

                if (fieldData) {
                    Object.keys(fieldData).forEach(field => {
                        uniqueFields.add(field);
                    });
                }
            });

            setuniqueFieldsData(Array.from(uniqueFields));
        } catch (error) {
            console.log(error)
        }
    }

    const uniqueFieldsDataOptions = uniqueFieldsData.map(collection => ({
        value: collection,
        label: collection,
    }));

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
                                <h4 className="page-title">Update Filter</h4>
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
                        <form onSubmit={filterUpdate} method='post'>
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
                                                        id="FilterName"
                                                        onChange={(e) => {
                                                            setFilterName(e.target.value)
                                                        }}
                                                        value={filtername}
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
                                                        value="Multiple"
                                                        checked={type === 'Multiple'}
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
                                                        checked={layout === 'List & Grid View'}
                                                        value="List & Grid View"
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
                                                isMulti={type === 'Multiple'}
                                                options={ListCollectionsOptions}
                                                required
                                                defaultValue={selectedOption}
                                                onChange={setSelectedOption}
                                            />
                                            <button className='my-3 btn btn-primary' onClick={FilterFields}>Filter Collection Fields</button>
                                            <Select
                                                className="w-25 w_collection_options"
                                                required
                                                defaultValue={selectedUniqueOption}
                                                onChange={setSelectedUniqueOption}
                                                options={uniqueFieldsDataOptions}
                                                isMulti={type === 'Multiple'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type='submit'
                                className="btn btn-danger mt-4  waves-light text-white"
                            >Update</button>
                        </form>
                    </div>
                </Layout>
            )}
        </>
    )
}

export default ListDetails;
