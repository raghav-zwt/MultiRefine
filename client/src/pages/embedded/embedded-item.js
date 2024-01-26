import React, { useEffect, useState } from "react";
import "./embedded.css";
import NotFoundImage from "../../assets/images/not-found.png";
import LoadingImage from "../../assets/images/loader.gif";

const EmbeddedItem = ({ id, fieldData, layout, isOn, collectionMapping }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const renderedItems = Object.entries(collectionMapping).map(([key, value]) => {
        const selectImage = value.select_image?.value;
        const selectTitle = value.select_title?.value;
        const selectCategory = value.select_category?.value;
        return { key, selectImage, selectTitle, selectCategory };
    });

    const mappedItemImage = renderedItems.find(item => fieldData?.[item.selectImage]) || {};
    const mappedItemTitle = renderedItems.find(item => fieldData?.[item.selectTitle]) || {};
    const mappedItemCategory = renderedItems.find(item => fieldData?.[item.selectCategory]) || {};

    const isListView = layout === "List View";
    const columnClass = isListView || isOn ? 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12' : 'col-xl-3 col-md-6';
    const imageBoxClass = isListView || isOn ? 'multirefine-filter-img-box-list' : 'multirefine-filter-img-box-grid';

    if (isLoading) {
        return (
            <div key={id} className={columnClass}>
                <div className="multirefine-filter-card multirefine-filoader card h-100 border">
                    <img src={LoadingImage} height={30} width={30} alt="LoadingImage" />
                    <h5 className="mt-3 mb-0">Loading...</h5>
                </div>
            </div>
        );
    }

    return (
        <div key={id} className={columnClass}>
            <div className="multirefine-filter-card card h-100 border">
                <div className={imageBoxClass}>
                    <img
                        src={fieldData?.[mappedItemImage?.selectImage]?.url || NotFoundImage}
                        className="multirefine-filter-img"
                        alt={fieldData?.name || "Image not available"}
                    />
                </div>
                <div className="multirefine-filter-body card-body">
                    <h5 className="multirefine-filter-title card-title">
                        {fieldData?.[mappedItemTitle?.selectTitle] || ""}
                    </h5>
                    <p className="card-text">
                        {fieldData?.[mappedItemCategory?.selectCategory] || ""}
                    </p>
                </div>
            </div>
        </div>
    );
};

export { EmbeddedItem };