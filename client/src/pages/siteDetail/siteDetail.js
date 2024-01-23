import React, { useEffect, useState } from 'react'
import Layout from "../../layouts/layout.js";
import axios from "axios";
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import Loader from '../../components/Loader.js';
import "./siteDetail.css"

const SiteDetail = () => {
    const Bearer = localStorage.getItem("accessToken");
    const [listCollections, setListCollections] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [type, setType] = useState("");
    const [layout, setLayout] = useState("");
    const navigate = useNavigate();
    const [filtername, setFilterName] = useState("");
    const [uniqueFieldsData, setuniqueFieldsData] = useState([]);
    const [selectedUniqueOption, setSelectedUniqueOption] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mappingOption, setMappingOption] = useState({});
    const [siteList, setSiteList] = useState([]);
    const authData = localStorage.getItem("auth");
    const [isfetch, setIsFetch] = useState(false);
    const [isChecked, setIsChecked] = useState(0);

    const params = useParams();
    const site_id = params.id;
    const site_name = params.name;

    const handleChangeType = event => {
        setType(event.target.value);
    };

    const handleChangeLayout = event => {
        setLayout(event.target.value);
    };

    const SiteListCollections = async () => {
        setIsLoading(true);
        const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/filter/getSiteList`, {
            site_id: `${site_id}`,
        });

        if (data.status === 200) {
            setSiteList(data?.data?.data)
            setIsLoading(false);
        }
    }

    useEffect(() => {
        SiteListCollections();
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        setIsLoading(true);
        const ListCollections = async () => {
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/ListCollections`, {
                site_id: `${site_id}`,
                Bearer: `${Bearer}`
            });

            if (data.status === 200) {
                setListCollections(data?.data?.collections);
                setIsLoading(false);
            }
        }

        ListCollections();
    }, [site_id, Bearer])

    const ListCollectionsOptions = listCollections.map(collection => ({
        value: collection.id,
        label: collection.displayName,
    }));

    const filterSend = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0]

            const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/filter/add`, {
                user_id: JSON.parse(authData)[0].id,
                site_id: site_id,
                site_name: site_name,
                name: filtername,
                type: type,
                layout: layout,
                collection: JSON.stringify(selectedOption),
                collection_category: JSON.stringify(selectedUniqueOption),
                collection_mapping: JSON.stringify(mappingOption),
                multiselect_switch: isChecked,
                date: formattedDate
            });

            if (data?.data?.success) {
                toast.success(data?.data?.message);
                setIsLoading(false);
                navigate("/list");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setIsLoading(false);
        }
    }

    const FilterFields = async (e) => {
        setIsFetch(true);
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
                    setIsFetch(false);
                    return response?.data?.items;
                }));
            } else {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/ListCollectionItems`, {
                    collection_id: selectedOptionValue.value,
                    Bearer: `${Bearer}`
                });
                setIsFetch(false);
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
            console.log(error);
            toast.error(error?.response?.data?.message);
            setIsFetch(false);
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

    const filterRemoveId = async (id) => {
        setIsLoading(true)
        try {
            const data = await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/filter/remove/${id}`
            );
            if (data?.data?.success) {
                toast.success(data?.data?.message);
                SiteListCollections();
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setIsLoading(false)
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked((prevValue) => (prevValue === 0 ? 1 : 0));
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Layout title={"Filter Details"} description={""}>
                <div className="page-breadcrumb bg-white">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <h4 className="page-title">Filter Details</h4>
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
                    <div className="row pb-4">
                        <div className="col-12">
                            <div className="white-box mb-0 p-0 analytics-info">
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header d-flex align-items-center" id="headingOne">
                                            <button className="accordion-button bg-white text-black border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                <label className='box-title mb-0'>Site Filter List</label>
                                            </button>
                                            <Link className='me-3 btn btn-primary All-Filter-list' to={"/list"}>All Filter list</Link>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse border-0 collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <div className="table-responsive">
                                                    <table className="table no-wrap mb-0">
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
                                                                Array.isArray(siteList) && siteList.length === 0 ?
                                                                    (
                                                                        <tr>
                                                                            <td className="txt-oflo border-0">Not Found</td>
                                                                        </tr>

                                                                    ) :
                                                                    (
                                                                        <>
                                                                            {Array.isArray(siteList) && siteList?.map((e) => (
                                                                                <>
                                                                                    <tr key={e.id}>
                                                                                        <td className="txt-oflo">{e.name}</td>
                                                                                        <td className="txt-oflo">{e.site_name}</td>
                                                                                        <td><span className="">{e.type}</span></td>
                                                                                        <td><span className="">{e.layout}</span></td>
                                                                                        <td className="txt-oflo">{e.date.split('T')[0]}</td>
                                                                                        <td><span className="btn btn-info text-white">{e.collection.length >= 1 ? e.collection.length : 1}</span></td>
                                                                                        <td className="d-flex align-items-center gap-2">
                                                                                            <Link to={`/list/listdetails/${e.id}`} className="btn btn-danger d-md-block pull-right waves-effect waves-light text-white"
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
                            </div>
                        </div>
                    </div>
                    <form onSubmit={filterSend} method='post'>
                        <div className="row pb-4">
                            <div className="col-lg-4 col-xlg-4 col-md-12">
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
                            <div className="col-lg-4 col-xlg-4 col-md-12">
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
                                    <h3 className="box-title mt-4">Filter Select Type</h3>
                                    <div
                                        id="filterType"
                                        className="d-flex flex-wrap align-items-center mt-4 gap-4">
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" checked={isChecked}
                                                onChange={handleCheckboxChange} type="checkbox" id="MultiSwitchCheckDefault" />
                                            <label className="form-check-label" htmlFor="MultiSwitchCheckDefault">Multi Select</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-xlg-4 col-md-12">
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
                        <div className="row pb-4">
                            <div className="col-lg-6 col-xlg-6 col-md-6">
                                <div className="white-box analytics-info h-100">
                                    <h3 className="my-3 box-title">Select Collection</h3>
                                    <Select
                                        className="w-100 w_collection_options"
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        isMulti={type === 'Multiple'}
                                        required
                                        options={ListCollectionsOptions}
                                    />
                                    {selectedOption === null ? "" : (
                                        <>
                                            {isfetch ? (
                                                <>
                                                    <button className='mt-3 btn btn-primary'>Loading...</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className='mt-3 btn btn-primary' onClick={FilterFields}>Fetch Filter Fields</button>
                                                </>
                                            )}

                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-xlg-6 col-md-6">
                                <div className="white-box analytics-info h-100">
                                    <h3 className="my-3 box-title">Select Collection Categories</h3>
                                    <Select
                                        className="w-100 w_collection_options"
                                        defaultValue={selectedUniqueOption}
                                        onChange={setSelectedUniqueOption}
                                        options={uniqueFieldsDataOptions}
                                        isMulti={type === 'Multiple'}
                                    />
                                </div>
                            </div>
                            {selectedOption ? (
                                <div className="col-12 pt-4">
                                    <div className="white-box mb-0 p-0 analytics-info">
                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item border-0">
                                                <h2 className="accordion-header" id="headingThree">
                                                    <button className="p-3 accordion-button bg-white text-black border-0 shadow-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                        <label className='box-title mb-0'>Map filter data</label>
                                                    </button>
                                                </h2>
                                                <div id="collapseThree" className="accordion-collapse border-0 collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className='row'>
                                                            {Array.isArray(selectedOption) && selectedOption?.length > 0 ? (
                                                                selectedOption.map((lab) => (
                                                                    <div className="col-lg-3 col-xlg-3 col-md-3">
                                                                        <div>
                                                                            <h3 className="mb-4">{lab.label}</h3>
                                                                            <label className="mb-2">Select Image</label>
                                                                            <Select
                                                                                className="w-100 w_collection_options"
                                                                                required
                                                                                placeholder="Select Image"
                                                                                name='select_image'
                                                                                defaultValue={mappingOption?.select_image}
                                                                                onChange={(e) => handleInputChange(lab.label, 'select_image', e)}
                                                                                options={uniqueFieldsDataOptions}
                                                                            />
                                                                            <label className="my-2">Select Title</label>
                                                                            <Select
                                                                                className="w-100 w_collection_options"
                                                                                required
                                                                                name='select_title'
                                                                                placeholder="Select Title"
                                                                                defaultValue={mappingOption?.select_title}
                                                                                onChange={(e) => handleInputChange(lab.label, 'select_title', e)}
                                                                                options={uniqueFieldsDataOptions}
                                                                            />
                                                                            <label className="my-2">Select Category</label>
                                                                            <Select
                                                                                className="w-100 w_collection_options"
                                                                                name='select_category'
                                                                                placeholder="Select Category"
                                                                                defaultValue={mappingOption?.select_category}
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
                                                                            defaultValue={mappingOption?.select_image}
                                                                            onChange={(e) => handleInputChange(selectedOption?.label, 'select_image', e)}
                                                                            options={uniqueFieldsDataOptions}
                                                                        />
                                                                        <label className="my-2">Select Title</label>
                                                                        <Select
                                                                            className="w-100 w_collection_options"
                                                                            required
                                                                            name='select_title'
                                                                            placeholder="Select Title"
                                                                            defaultValue={mappingOption?.select_title}
                                                                            onChange={(e) => handleInputChange(selectedOption?.label, 'select_title', e)}
                                                                            options={uniqueFieldsDataOptions}
                                                                        />
                                                                        <label className="my-2">Select Category</label>
                                                                        <Select
                                                                            className="w-100 w_collection_options"
                                                                            name='select_category'
                                                                            placeholder="Select Category"
                                                                            defaultValue={mappingOption?.select_category}
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
                        <div className='d-flex flex-warp gap-3'>
                            <button
                                type='submit'
                                className="btn btn-primary waves-light text-white"
                            >Create Now</button>
                            <Link to={"/"}
                                className="btn btn-primary waves-light text-white"
                            >Cancel</Link>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    )
}

export default SiteDetail
