import React, { useEffect, useMemo, useState, useRef } from 'react';
import "./embedded.css";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { EmbeddedItem } from "./embedded-item.js"
import notFound from "../../assets/images/notFound.png";
import Select from 'react-select';
import Loader from '../../components/Loader.js';
import CryptoJS from "crypto-js";
import { toast } from 'react-toastify';

const EmbeddedPage = () => {

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const encrypt_user_id = queryParams.get('user_id');
    const encrypt_id = queryParams.get('id');

    const linkBytes_user_id = CryptoJS.AES.decrypt(encrypt_user_id, process.env.REACT_APP_CRYPTOJS);
    const decryptedLink_user_id = linkBytes_user_id?.toString(CryptoJS.enc.Utf8);

    const linkBytes_id = CryptoJS.AES.decrypt(encrypt_id, process.env.REACT_APP_CRYPTOJS);
    const decryptedLink_id = linkBytes_id?.toString(CryptoJS.enc.Utf8);

    const user_id = decryptedLink_user_id;
    const id = decryptedLink_id

    const [data, setData] = useState({ collection: [] });
    const [accessToken, setAccessToken] = useState([]);
    const [isOn, setIsOn] = useState(false);
    const [allCollectionData, setAllCollectionData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sportList, setSportList] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState({});
    const [visibleItemCount, setVisibleItemCount] = useState(8);
    const [isLoader, setIsLoader] = useState(false);
    const loadMoreIncrement = 8;

    useEffect(() => {
        setSportList(allCollectionData);
    }, [allCollectionData]);

    function getFilteredList() {
        let filteredList = sportList;
        if (searchQuery) {
            const lowerCaseSearchTerm = searchQuery.toLowerCase();

            const dataXcategory = data?.collection_category;
            if (Array.isArray(dataXcategory)) {
                filteredList = filteredList.filter((item) =>
                    dataXcategory.some((xcate) =>
                        item.fieldData?.[xcate.value]?.toLowerCase().includes(lowerCaseSearchTerm) ||
                        item.fieldData?.name?.toLowerCase().includes(lowerCaseSearchTerm)
                    )
                );
            } else {
                filteredList = filteredList.filter((item) =>
                    item.fieldData?.[dataXcategory]?.toLowerCase().includes(lowerCaseSearchTerm) ||
                    item.fieldData?.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
                    item.fieldData?.slug?.toLowerCase().includes(lowerCaseSearchTerm)
                );
            }
        }
        Object.entries(selectedCategories).forEach(([categoryName, categoryValue]) => {
            if (categoryValue) {
                filteredList = dynamicFilter(filteredList, categoryName, categoryValue);
            }
        });

        return filteredList;
    }

    function dynamicFilter(list, propertyName, propertyValue) {
        return list.filter((item) => propertyValue.includes(`${item.fieldData?.[propertyName]}`));
    }

    const filteredList = useMemo(getFilteredList, [searchQuery, selectedCategories, sportList, data?.collection_category]);

    function handleCategoryChange(event, categoryName) {
        if (data?.multiselect_switch === 1) {
            setSelectedCategories({
                ...selectedCategories,
                [categoryName]: event.map(element => element?.value),
            });
        } else {
            setSelectedCategories({
                ...selectedCategories,
                [categoryName]: event?.value,
            });
        }
        setVisibleItemCount(8);
    }

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    function handleSearchChange(event) {
        setSearchQuery(event.target.value);
        setVisibleItemCount(8);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/filter/embedded_code/user_id=${user_id}&id=${id}`);
                const responseData = response?.data?.data[0];
                if (response?.data?.success && responseData) {
                    setData(responseData);
                    setAccessToken(responseData?.access_token);
                    localStorage.setItem("accessToken", responseData?.access_token);
                }
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        };

        fetchData();
    }, [user_id, id]);

    useEffect(() => {
        const fetchDataForCollections = async () => {
            try {
                let collectionData;
                if (Array.isArray(data.collection)) {
                    collectionData = await Promise.all(data.collection.map(async (collection) => {
                        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/ListCollectionItems`, {
                            collection_id: collection.value,
                            Bearer: `${accessToken}`
                        });
                        setIsLoading(false);
                        return response?.data?.items;
                    }));
                } else {
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/ListCollectionItems`, {
                        collection_id: data.collection.value,
                        Bearer: `${accessToken}`
                    });
                    setIsLoading(false);
                    collectionData = [response?.data?.items];
                }
                const flattenedCollectionData = collectionData.reduce((acc, val) => acc.concat(val), []);
                setAllCollectionData(flattenedCollectionData);
            } catch (error) {
                setIsLoading(false);
                console.error('Error fetching data for collections', error);
            }
        };

        if (data.collection) {
            fetchDataForCollections();
        }
    }, [data, accessToken]);

    const displayedItems = filteredList.slice(0, visibleItemCount);

    const handleLoadMore = async () => {
        setIsLoader(true);

        await new Promise((resolve) => setTimeout(resolve, 500));

        setVisibleItemCount((prevCount) => prevCount + loadMoreIncrement);

        setIsLoader(false);
    };

    const selectRefs = useRef({});

    const resetFilterBtn = async (e) => {
        e.preventDefault();

        Object.values(selectRefs.current).forEach((selectRef) => {
            if (selectRef && selectRef && typeof selectRef.clearValue === 'function') {
                selectRef.clearValue();
            }
        });
        setSearchQuery("");
        setSelectedCategories({});
        setVisibleItemCount(8);
    }

    const handleRemoveCategory = (categoryName, valueToRemove) => {
        if (data?.multiselect_switch === 1) {
            setSelectedCategories(prevCategories => {
                const filteredValues = prevCategories[categoryName].filter(value => value !== valueToRemove);
                if (filteredValues.length === 0) {
                    const { [categoryName]: _, ...remainingCategories } = prevCategories;
                    return remainingCategories;
                } else {
                    return {
                        ...prevCategories,
                        [categoryName]: filteredValues,
                    };
                }
            });
        } else {
            const updatedCategories = { ...selectedCategories };
            delete updatedCategories[categoryName];
            setSelectedCategories(updatedCategories);
        }
        setVisibleItemCount(8);
    };

    const dataCollectionCategory = data?.collection_category?.value;

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <style>
                {data?.css}
            </style>
            <div className='container-fluid'>
                <div className='py-4'>
                    <div className="mb-4">
                        <div className='d-flex align-items-center'>
                            {searchQuery === "" ? "" : (
                                <>
                                    <button type="button" className="btn btn-primary mb-4">
                                        Search results :<span className="badge fw-bold fs-3 badge-white ps-1 p-0">{searchQuery}</span>
                                    </button>
                                </>
                            )}
                            <div className='selectedCategories-items ms-auto d-flex align-items-center gap-4 mb-4'>
                                {Object.entries(selectedCategories).map(([categoryName, selectedValue]) => (
                                    <>
                                        {selectedValue === "" ? "" : (
                                            <>
                                                {data?.multiselect_switch === 1 ? (
                                                    selectedValue.map((e) => (
                                                        <div key={categoryName} type="button" className="border ps-2">
                                                            {categoryName} :<span className="fw-bold fs-3 ps-1 p-0">{e}</span>
                                                            <span className="ms-2 btn btn-primary" onClick={() => handleRemoveCategory(categoryName, e)}>X</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div key={categoryName} type="button" className="border ps-2">
                                                        {categoryName} :<span className="fw-bold fs-3 ps-1 p-0">{selectedValue}</span>
                                                        <span className="ms-2 btn btn-primary" onClick={() => handleRemoveCategory(categoryName)}>X</span>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </>
                                ))}
                            </div>
                        </div>
                        <div className="gap-4 d-flex flex-wrap justify-content-end agline-item-center">
                            <div className='w-25 me-auto'>
                                <input value={searchQuery}
                                    onChange={handleSearchChange} placeholder='Search...' className='multirefine-filter-search form-control' />
                            </div>
                            <div className='d-flex flex-wrap gap-4'>
                                {data?.collection_category === null ? "" : (
                                    <>
                                        {Array.isArray(data?.collection_category) && data?.collection_category.length >= 1 ? (
                                            data?.collection_category.map((category) => (
                                                <div className='d-flex gap-3 align-items-center' key={category.value}>
                                                    <label className="form-check-label mb-0">{category.value?.charAt(0).toUpperCase() + category.value?.slice(1)}</label>
                                                    <Select
                                                        ref={(ref) => (selectRefs.current[category.value] = ref)}
                                                        key={`unique-select-key-category-list-${category.value}`}
                                                        name={`category-list-${category.value}`}
                                                        id={`category-list-${category.value}`}
                                                        defaultValue={selectedCategories[category.value] || ''}
                                                        placeholder={`Select ${category.value}`}
                                                        className='category-list-items'
                                                        value={data?.multiselect_switch === 1 ? selectedCategories[category.value]?.map(val => ({ label: val, value: val })) || '' : ""}
                                                        controlShouldRenderValue={false}
                                                        isClearable={false}
                                                        onChange={(selectedOption) => handleCategoryChange(selectedOption, category?.value)}
                                                        required
                                                        isMulti={data?.multiselect_switch === 1}
                                                        options={[
                                                            ...sportList
                                                                .filter((e, index, self) => (
                                                                    index === self.findIndex((t) => (
                                                                        `${t.fieldData?.[`${category.value}`]}` === `${e.fieldData?.[`${category.value}`]}`
                                                                    ))
                                                                ))
                                                                .filter((e) => e.fieldData?.[`${category.value}`] !== undefined)
                                                                .map((e) => ({ label: `${e.fieldData?.[`${category.value}`]}`, value: `${e.fieldData?.[`${category.value}`]}` }))
                                                        ]}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <div className='d-flex gap-3 align-items-center'>
                                                <label className="form-check-label mb-0">{dataCollectionCategory?.charAt(0).toUpperCase() + dataCollectionCategory?.slice(1)}</label>
                                                <Select
                                                    ref={(ref) => (selectRefs.current[dataCollectionCategory] = ref)}
                                                    key={`unique-select-key-category-list-${dataCollectionCategory}`}
                                                    name={`category-list-${dataCollectionCategory}`}
                                                    id={`category-list-${dataCollectionCategory}`}
                                                    defaultValue={selectedCategories[dataCollectionCategory] || ''}
                                                    className='category-list-items'
                                                    placeholder={`Select ${dataCollectionCategory}`}
                                                    value={data?.multiselect_switch === 1 ? selectedCategories[dataCollectionCategory]?.map(val => ({ label: val, value: val })) || '' : ""}
                                                    isClearable={false}
                                                    controlShouldRenderValue={false}
                                                    onChange={(selectedOption) => handleCategoryChange(selectedOption, dataCollectionCategory)}
                                                    required
                                                    isMulti={data?.multiselect_switch === 1}
                                                    options={[
                                                        ...sportList
                                                            .filter((e, index, self) =>
                                                                index === self.findIndex((t) => (
                                                                    `${t.fieldData?.[`${dataCollectionCategory}`]}` === `${e.fieldData?.[`${dataCollectionCategory}`]}`
                                                                ))
                                                            )
                                                            .map((e) => (
                                                                e.fieldData?.[`${dataCollectionCategory}`] !== undefined && (
                                                                    { label: `${e.fieldData?.[`${dataCollectionCategory}`]}`, value: `${e.fieldData?.[`${dataCollectionCategory}`]}` }
                                                                )
                                                            ))
                                                    ]}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                            <button onClick={resetFilterBtn} className='reset-filter-btn btn btn-primary'>Reset all</button>
                        </div>
                    </div>
                    <div className="">
                        {data?.layout === "List & Grid View" ? (<>
                            <div className='d-flex justify-content-end'>
                                <div className="form-check form-switch mb-4">
                                    <input className="form-check-input" checked={isOn}
                                        onChange={handleToggle}
                                        type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label mb-0" htmlFor="flexSwitchCheckDefault">List View</label>
                                </div>
                            </div>
                        </>) : (<>
                        </>)}
                        <div className='multirefine-filter-row row gy-4'>
                            {displayedItems.length === 0 ? (
                                <>
                                    <div className='NotFound-Box'>
                                        <img src={notFound} alt='notFound' />
                                        <h4 className='my-2 text-center No-data-found'>No results found.</h4>
                                        <p className="mb-0 mt-4">Please try different keywords.</p>
                                    </div>
                                </>
                            ) : (
                                displayedItems.map((element, index) => (
                                    <EmbeddedItem {...element} {...data} isOn={isOn} collectionMapping={data?.collection_mapping} key={index} />
                                ))
                            )}
                        </div>
                        {isLoader ? (
                            <div className="text-center load-more mt-4">
                                <div className="btn btn-primary">
                                    Loading...
                                </div>
                            </div>
                        ) : (
                            filteredList.length > visibleItemCount && (
                                <div className="text-center load-more mt-4">
                                    <button className="btn btn-primary" onClick={handleLoadMore}>
                                        Load More
                                    </button>
                                </div>
                            )
                        )}
                        <div className='text-center mt-4'>
                            <div className="filter_cmsload_counter">
                                <div className="filter_cmsload_text">Showing </div>
                                <div className="filter_cmsload_number">{displayedItems.length}</div>
                                <div className="filter_cmsload_text">out of </div>
                                <div className="filter_cmsload_number">{sportList.length}</div> results
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default EmbeddedPage;
