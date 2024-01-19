import React, { useEffect, useMemo, useState } from 'react';
import "./embedded.css";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { EmbeddedItem } from "./embedded-item.js"
import notFound from "../../assets/images/notFound.png";

const EmbeddedPage = () => {

    const location = useLocation();
    const { pathname } = location;
    const [, user_id, id] = pathname.match(/user_id=(\d+)&id=(\d+)/) || [];
    const [data, setData] = useState({ collection: [] });
    const [accessToken, setAccessToken] = useState([]);
    const [isOn, setIsOn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [allCollectionData, setAllCollectionData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sportList, setSportList] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState({});
    const [visibleItemCount, setVisibleItemCount] = useState(8);
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
                        item.fieldData?.[xcate.value].toLowerCase().includes(lowerCaseSearchTerm) ||
                        item.fieldData?.name.toLowerCase().includes(lowerCaseSearchTerm)
                    )
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
        return list.filter((item) => `${item.fieldData?.[propertyName]}` === propertyValue);
    }

    const filteredList = useMemo(getFilteredList, [searchQuery, selectedCategories, sportList, data?.collection_category]);

    function handleCategoryChange(event, categoryName) {
        setSelectedCategories({
            ...selectedCategories,
            [categoryName]: event.target.value,
        });
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
                    setAccessToken(responseData.access_token);
                    localStorage.setItem("accessToken", responseData.access_token);
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
                        return response?.data?.items;
                    }));
                } else {
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/ListCollectionItems`, {
                        collection_id: data.collection.value,
                        Bearer: `${accessToken}`
                    });
                    collectionData = [response?.data?.items];
                }
                const flattenedCollectionData = collectionData.reduce((acc, val) => acc.concat(val), []);
                setAllCollectionData(flattenedCollectionData);
            } catch (error) {
                console.error('Error fetching data for collections', error);
            }
        };

        if (data.collection) {
            fetchDataForCollections();
        }
    }, [data, accessToken]);

    const displayedItems = filteredList.slice(0, visibleItemCount);

    const handleLoadMore = async () => {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 500));

        setVisibleItemCount((prevCount) => prevCount + loadMoreIncrement);

        setIsLoading(false);
    };

    const resetFilterBtn = async (e) => {
        e.preventDefault();
        setSearchQuery("");
        setSelectedCategories("");
        setVisibleItemCount(8);
    }

    return (
        <>
            <style>
                {data?.css}
            </style>
            <div className='container-fluid'>
                <div className='py-4'>
                    <div className="mb-4">
                        {searchQuery === "" ? "" : (
                            <>
                                <button type="button" class="btn btn-primary mb-4">
                                    Search results :<span class="badge badge-light">{searchQuery}</span>
                                </button>
                            </>
                        )}
                        <div className="gap-4 d-flex flex-wrap justify-content-end agline-item-center">
                            <div className='w-25 me-auto'>
                                <input value={searchQuery}
                                    onChange={handleSearchChange} placeholder='Search...' className='multirefine-filter-search form-control' />
                            </div>
                            <div className='d-flex flex-wrap gap-4'>
                                {Array.isArray(data?.collection_category) && data?.collection_category.length >= 1 ? (
                                    data?.collection_category.map((category) => (
                                        <div className='d-flex gap-3 align-items-center' key={category.value}>
                                            <label className="form-check-label mb-0">{category.value}</label>
                                            <select
                                                name={`category-list-${category.value}`}
                                                id={`category-list-${category.value}`}
                                                className='form-control category-list-items'
                                                value={selectedCategories[category.value] || ''}
                                                onChange={(event) => handleCategoryChange(event, category.value)}
                                            >
                                                <option value="">All</option>
                                                {Array.isArray(sportList) &&
                                                    sportList
                                                        .filter((e, index, self) =>
                                                            index === self.findIndex((t) => (
                                                                `${t.fieldData?.[`${category.value}`]}` === `${e.fieldData?.[`${category.value}`]}`
                                                            ))
                                                        )
                                                        .map((e) => (
                                                            e.fieldData?.[`${category.value}`] !== undefined && (
                                                                <option key={e.id} value={`${e.fieldData?.[`${category.value}`]}`}>
                                                                    {`${e.fieldData?.[`${category.value}`]}`}
                                                                </option>
                                                            )
                                                        ))
                                                }
                                            </select>
                                        </div>
                                    ))
                                ) : (
                                    <div className='d-flex gap-3 align-items-center'>
                                        <label className="form-check-label mb-0">{data?.collection_category?.value}</label>
                                        <select
                                            name={`category-list-${data?.collection_category?.value}`}
                                            id={`category-list-${data?.collection_category?.value}`}
                                            className='form-control category-list-items'
                                            value={selectedCategories[data?.collection_category?.value] || ''}
                                            onChange={(event) => handleCategoryChange(event, data?.collection_category?.value)}
                                        >
                                            <option value="">All</option>
                                            {Array.isArray(sportList) &&
                                                sportList
                                                    .filter((e, index, self) =>
                                                        index === self.findIndex((t) => (
                                                            `${t.fieldData?.[`${data?.collection_category?.value}`]}` === `${e.fieldData?.[`${data?.collection_category?.value}`]}`
                                                        ))
                                                    )
                                                    .map((e) => (
                                                        e.fieldData?.[`${data?.collection_category?.value}`] !== undefined && (
                                                            <option key={e.id} value={`${e.fieldData?.[`${data?.collection_category?.value}`]}`}>
                                                                {`${e.fieldData?.[`${data?.collection_category?.value}`]}`}
                                                            </option>
                                                        )
                                                    ))
                                            }
                                        </select>
                                    </div>
                                )}
                            </div>
                            <button onClick={resetFilterBtn} className='reset-filter-btn'>reset</button>
                        </div>
                    </div>
                    <div className="mb-4">
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
                                        <p className="mb-0">Please try different keywords.</p>
                                    </div>
                                </>
                            ) : (
                                displayedItems.map((element, index) => (
                                    <EmbeddedItem {...element} {...data} isOn={isOn} collectionMapping={data?.collection_mapping} key={index} />
                                ))
                            )}
                        </div>
                        {isLoading ? (
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
                    </div>
                </div>
            </div >
        </>
    )
}

export default EmbeddedPage;
