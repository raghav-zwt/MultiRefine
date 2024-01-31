import React, { useEffect, useMemo, useState } from 'react';
import "./embedded.css";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { EmbeddedItem } from "./embedded-item.js"
import { Pagination } from "./Pagination.js"

const EmbeddedPage = () => {

    const location = useLocation();
    const { pathname } = location;
    const [, user_id, id] = pathname.match(/user_id=(\d+)&id=(\d+)/) || [];
    const [data, setData] = useState({ collection: [] });
    const [accessToken, setAccessToken] = useState([]);
    const [isOn, setIsOn] = useState(false);
    const [allCollectionData, setAllCollectionData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sportList, setSportList] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        setSportList(allCollectionData);
    }, [allCollectionData]);

    function getFilteredList() {
        let filteredList = sportList;
        if (searchQuery) {
            const lowerCaseSearchTerm = searchQuery.toLowerCase();
            filteredList = filteredList.filter(
                (item) => item.fieldData?.name.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }
        Object.entries(selectedCategories).forEach(([categoryName, categoryValue]) => {
            if (categoryValue) {
                filteredList = dynamicFilter(filteredList, categoryName, categoryValue);
            }
        });

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredList.slice(startIndex, endIndex);
    }

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

    function dynamicFilter(list, propertyName, propertyValue) {
        return list.filter((item) => `${item.fieldData?.[propertyName]}` === propertyValue);
    }

    const filteredList = useMemo(getFilteredList, [searchQuery, selectedCategories, sportList, currentPage]);

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

    return (
        <>
            <style>
                {data?.css}
            </style>
            <div className='container-md'>
                <div className='py-4'>
                    <div className="mb-4">
                        <div className="gap-4 d-flex justify-content-between">
                            <div className='w-25'>
                                <input value={searchQuery}
                                    onChange={handleSearchChange} placeholder='Search...' className='form-control' />
                            </div>
                            <div className='d-flex gap-4'>
                                {Array.isArray(data?.collection_category) && data?.collection_category.length > 1 ? (
                                    data?.collection_category.map((category) => (
                                        <div key={category.value}>
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
                                                            <option key={e.id} value={`${e.fieldData?.[`${category.value}`]}`}>
                                                                {`${e.fieldData?.[`${category.value}`]}`}
                                                            </option>
                                                        ))
                                                }
                                            </select>
                                        </div>
                                    ))
                                ) : (
                                    <div>
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
                                                        <option key={e.id} value={`${e.fieldData?.[`${data?.collection_category?.value}`]}`}>
                                                            {`${e.fieldData?.[`${data?.collection_category?.value}`]}`}
                                                        </option>
                                                    ))
                                            }
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
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
                        <div className='multirefine-filter-row row'>
                            {filteredList.length === 0 ? (
                                <h4 className='No-data-found mb-0'>No data found</h4>
                            ) : (
                                filteredList.map((element, index) => (
                                    <EmbeddedItem {...element} {...data} isOn={isOn} key={index} />
                                ))
                            )}
                        </div>
                        <div className="pagination justify-content-center mt-2">
                            <Pagination
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                totalItems={sportList.length}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default EmbeddedPage;
