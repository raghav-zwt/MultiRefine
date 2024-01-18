import React, { useEffect, useState } from 'react';
import Layout from "../../layouts/layout.js";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useParams } from "react-router-dom";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";

const ListDetails = () => {
    const [siteId, setSiteId] = useState("");
    const [listCollections, setListCollections] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedUniqueOption, setSelectedUniqueOption] = useState(null);
    const [uniqueFieldsData, setuniqueFieldsData] = useState([]);
    const [mappingOption, setMappingOption] = useState({});
    const Bearer = localStorage.getItem("accessToken");
    const params = useParams();
    const [filtername, setFilterName] = useState("");
    const [type, setType] = useState("");
    const [layout, setLayout] = useState("");
    const navigate = useNavigate();

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
                    setMappingOption(data?.data?.data[0].collection_mapping)

                    if (siteId) {
                        const ListCollections = async () => {
                            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/ListCollections`, {
                                site_id: `${siteId}`,
                                Bearer: `${Bearer}`
                            });

                            if (data?.status === 200) {
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

            const data = await axios.put(`${process.env.REACT_APP_API_URL}/api/filter/filterUpdate/${params.id}`, {
                user_id: JSON.parse(authData)[0].id,
                id: params.id,
                name: filtername,
                type: type,
                layout: layout,
                collection: JSON.stringify(selectedOption),
                collection_category: JSON.stringify(selectedUniqueOption),
                collection_mapping: JSON.stringify(mappingOption),
                date: formattedDate
            });

            if (data?.data?.success) {
                toast.success(data?.data?.message);
                navigate("/list")
            }
        } catch (error) {
            console.log(error.response?.data?.message)
            toast.error(error?.response?.data?.message);
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

    const handleInputChange = (category, fieldName, selectedValue) => {
        setMappingOption((prevFormData) => ({
            ...prevFormData,
            [category]: {
                ...prevFormData[category],
                [fieldName]: selectedValue,
            },
        }));
    };

    return (
        <>
            <Layout>
                <div className="page-breadcrumb bg-white">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <h4 className="page-title">Update Filter</h4>
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
                            <div className="row">
                                <div className="col-lg-6 col-xlg-6 mt-4 col-md-6">
                                    <div className="w-100 h-100">
                                        <div className="white-box analytics-info h-100 mb-0">
                                            <h3 className="my-3 box-title">Select Collection</h3>
                                            <Select
                                                className="w-100 w_collection_options"
                                                isMulti={type === 'Multiple'}
                                                options={ListCollectionsOptions}
                                                required
                                                value={selectedOption}
                                                defaultValue={selectedOption}
                                                onChange={setSelectedOption}
                                            />
                                            <button className='mt-3 btn btn-primary' onClick={FilterFields}>Filter Collection Fields</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-xlg-6 mt-4 col-md-6">
                                    <div className="w-100 h-100">
                                        <div className="white-box analytics-info h-100 mb-0">
                                            <h3 className="my-3 box-title">Select Collection Categories</h3>
                                            <Select
                                                className="w-100 w_collection_options"
                                                required
                                                defaultValue={selectedUniqueOption}
                                                onChange={setSelectedUniqueOption}
                                                value={selectedUniqueOption}
                                                options={uniqueFieldsDataOptions}
                                                isMulti={type === 'Multiple'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {selectedOption ? (
                                    <div className="col-12 pt-4">
                                        <div className="white-box mb-0 p-0 analytics-info">
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item border-0">
                                                    <h2 className="accordion-header" id="headingThree">
                                                        <button className="p-3 accordion-button bg-white text-black border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                                            <label className='box-title mb-0'>Map filter data</label>
                                                        </button>
                                                    </h2>
                                                    <div id="collapseThree" className="accordion-collapse border-0 collapse show" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            <div className='row'>
                                                                {Array.isArray(selectedOption) && selectedOption?.length > 0 ? (
                                                                    selectedOption.map((lab) => (
                                                                        <div key={lab.label} className="col-lg-3 col-xlg-3 col-md-3">
                                                                            <div>
                                                                                <h3 className="mb-4">{lab.label}</h3>
                                                                                <label className="mb-2">Select Image</label>
                                                                                <Select
                                                                                    className="w-100 w_collection_options"
                                                                                    required
                                                                                    name='select_image'
                                                                                    placeholder="Select Image"
                                                                                    defaultValue={mappingOption?.[lab.label]?.select_image}
                                                                                    onChange={(e) => handleInputChange(lab.label, 'select_image', e)}
                                                                                    options={uniqueFieldsDataOptions}
                                                                                />
                                                                                <label className="my-2">Select Title</label>
                                                                                <Select
                                                                                    className="w-100 w_collection_options"
                                                                                    required
                                                                                    name='select_title'
                                                                                    placeholder="Select Title"
                                                                                    defaultValue={mappingOption?.[lab.label]?.select_title}
                                                                                    onChange={(e) => handleInputChange(lab.label, 'select_title', e)}
                                                                                    options={uniqueFieldsDataOptions}
                                                                                />
                                                                                <label className="my-2">Select Category</label>
                                                                                <Select
                                                                                    className="w-100 w_collection_options"
                                                                                    required
                                                                                    name='select_category'
                                                                                    placeholder="Select Category"
                                                                                    defaultValue={mappingOption?.[lab.label]?.select_category}
                                                                                    onChange={(e) => handleInputChange(lab.label, 'select_category', e)}
                                                                                    options={uniqueFieldsDataOptions}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <div className="col-lg-3 col-xlg-3 col-md-3">
                                                                        <div>
                                                                            <h3 className="mb-4">{selectedOption?.label}</h3>
                                                                            <label className="mb-2">Select Image</label>
                                                                            <Select
                                                                                className="w-100 w_collection_options"
                                                                                required
                                                                                name='select_image'
                                                                                placeholder="Select Image"
                                                                                defaultValue={mappingOption?.[selectedOption?.label]?.select_image}
                                                                                onChange={(e) => handleInputChange(selectedOption?.label, 'select_image', e)}
                                                                                options={uniqueFieldsDataOptions}
                                                                            />
                                                                            <label className="my-2">Select Title</label>
                                                                            <Select
                                                                                className="w-100 w_collection_options"
                                                                                required
                                                                                name='select_title'
                                                                                placeholder="Select Title"
                                                                                defaultValue={mappingOption?.[selectedOption?.label]?.select_title}
                                                                                onChange={(e) => handleInputChange(selectedOption?.label, 'select_title', e)}
                                                                                options={uniqueFieldsDataOptions}
                                                                            />
                                                                            <label className="my-2">Select Category</label>
                                                                            <Select
                                                                                className="w-100 w_collection_options"
                                                                                required
                                                                                name='select_category'
                                                                                placeholder="Select Category"
                                                                                defaultValue={mappingOption?.[selectedOption?.label]?.select_category}
                                                                                onChange={(e) => handleInputChange(selectedOption?.label, 'select_category', e)}
                                                                                options={uniqueFieldsDataOptions}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-12 pt-4">
                                        <div className="white-box p-3 mb-0 analytics-info h-100">
                                            <h3 className="box-title mb-0">Mapping data not found</h3>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='d-flex flex-warp gap-3'>
                            <button
                                type='submit'
                                className="btn btn-danger mt-4 waves-light text-white"
                            >Update</button>
                            <Link to={"/list"}
                                className="btn btn-primary mt-4 waves-light text-white"
                            >Cancel</Link>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    )
}

export default ListDetails;
