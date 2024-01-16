import React from "react";
import "./embedded.css";
import NotFoundImage from "../../assets/images/not-found.png"

const EmbeddedItem = ({ id, fieldData, layout, isOn, collectionMapping }) => {

    const renderedItems = Object.entries(collectionMapping).map(([key, value]) => {
        const selectImage = value.select_image?.value;
        const selectTitle = value.select_title?.value;
        const selectCategory = value.select_category?.value;
        return { key, selectImage, selectTitle, selectCategory };
    });

    const mappedItemImage = renderedItems.find(item => fieldData?.[item.selectImage]) || {};
    const mappedItemTitle = renderedItems.find(item => fieldData?.[item.selectTitle]) || {};
    const mappedItemCategory = renderedItems.find(item => fieldData?.[item.selectCategory]) || {};

    return (
        <>
            <div key={id} className={layout === "List View" ? `col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12` : `${isOn ? 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12' : 'col-xl-3 col-md-6'}`}>
                <div className="multirefine-filter-card card h-100 border">
                    <div className={layout === "List View" ? `multirefine-filter-img-box-list` : `${isOn ? 'multirefine-filter-img-box-list' : 'multirefine-filter-img-box-grid'}`}>
                        <img src={fieldData?.[mappedItemImage?.selectImage]?.url ? fieldData?.[mappedItemImage?.selectImage]?.url : NotFoundImage} className="multirefine-filter-img" alt={fieldData?.name} />
                    </div>
                    <div className="multirefine-filter-body card-body">
                        <h5 className="multirefine-filter-title card-title">{fieldData?.[mappedItemTitle?.selectTitle] ? fieldData?.[mappedItemTitle?.selectTitle] : "Not Found"}</h5>
                        <p className="card-text">{fieldData?.[mappedItemCategory?.selectCategory] ? fieldData?.[mappedItemCategory?.selectCategory] : "Not Found"}</p>
                    </div>
                </div>
            </div>
        </>
    )
};

export { EmbeddedItem };