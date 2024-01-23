import React, { useEffect, useMemo, useState } from 'react';
import "./embedded.css";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { EmbeddedItem } from "./embedded-item.js"
import notFound from "../../assets/images/notFound.png";
import Select from 'react-select';
import Loader from '../../components/Loader.js';

const EmbeddedPage = () => {

    const location = useLocation();
    const { pathname } = location;
    const [, user_id, id] = pathname.match(/user_id=(\d+)&id=(\d+)/) || [];
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
                [categoryName]: event.map(element => element.value),
            });
        } else {
            setSelectedCategories({
                ...selectedCategories,
                [categoryName]: event.value,
            });
        }
        setVisibleItemCount(8);
    }

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    function handleSearchChange(event) {
        setSearchQuery(event.target.value);
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
                console.error('Error fetching embedded data', error);
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

    const resetFilterBtn = async (e) => {
        e.preventDefault();
        setSearchQuery("");
        setSelectedCategories({});
        setVisibleItemCount(8);
    }

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
                            <div className='selectedCategories-items ms-auto d-flex align-items-center gap-4'>
                                {Object.entries(selectedCategories).map(([categoryName, selectedValue]) => (
                                    <>
                                        {selectedValue === "" ? "" : (
                                            <>
                                                {data?.multiselect_switch === 1 ? (
                                                    selectedValue.map((e) => (
                                                        <button key={categoryName} type="button" className="btn btn-primary mb-4">
                                                            {categoryName} :<span className="badge fw-bold fs-3 badge-white ps-1 p-0">{e}</span>
                                                        </button>
                                                    ))
                                                ) : (
                                                    <button key={categoryName} type="button" className="btn btn-primary mb-4">
                                                        {categoryName} :<span className="badge fw-bold fs-3 badge-white ps-1 p-0">{selectedValue}</span>
                                                    </button>
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
                                                        key={`category-list-${category.value}`}
                                                        name={`category-list-${category.value}`}
                                                        id={`category-list-${category.value}`}
                                                        defaultValue={selectedCategories[category.value] || ''}
                                                        className='category-list-items'
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
                                                <label className="form-check-label mb-0">{data?.collection_category?.value?.charAt(0).toUpperCase() + data?.collection_category?.value?.slice(1)}</label>
                                                <Select
                                                    key={`category-list-${data?.collection_category?.value}`}
                                                    name={`category-list-${data?.collection_category?.value}`}
                                                    id={`category-list-${data?.collection_category?.value}`}
                                                    defaultValue={selectedCategories[data?.collection_category?.value] || ''}
                                                    className='category-list-items'
                                                    onChange={(selectedOption) => handleCategoryChange(selectedOption, data?.collection_category?.value)}
                                                    required
                                                    isMulti={data?.multiselect_switch === 1}
                                                    options={[
                                                        ...sportList
                                                            .filter((e, index, self) =>
                                                                index === self.findIndex((t) => (
                                                                    `${t.fieldData?.[`${data?.collection_category?.value}`]}` === `${e.fieldData?.[`${data?.collection_category?.value}`]}`
                                                                ))
                                                            )
                                                            .map((e) => (
                                                                e.fieldData?.[`${data?.collection_category?.value}`] !== undefined && (
                                                                    { label: `${e.fieldData?.[`${data?.collection_category?.value}`]}`, value: `${e.fieldData?.[`${data?.collection_category?.value}`]}` }
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
