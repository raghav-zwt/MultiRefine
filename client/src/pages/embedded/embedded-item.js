import React from "react";
import { Link } from "react-router-dom";
import "./embedded.css";

const EmbeddedItem = ({ id, fieldData, layout, isOn }) => (
    <>
        <div key={id} className={layout === "List View" ? `col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12` : `${isOn ? 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12' : 'col-xl-3 col-md-6'}`}>
            <div className="multirefine-filter-card card border">
                <div className={layout === "List View" ? `multirefine-filter-img-box-list` : `${isOn ? 'multirefine-filter-img-box-list' : 'multirefine-filter-img-box-grid'}`}>
                    <img src={fieldData?.name} className="multirefine-filter-img" alt={fieldData?.name} />
                </div>
                <div className="multirefine-filter-body card-body">
                    <h5 className="multirefine-filter-title card-title">{fieldData?.name}</h5>
                    <p className="card-text">{fieldData?.slug}</p>
                    <Link to={`/`} className="btn btn-primary">Go somewhere</Link>
                </div>
            </div>
        </div>
    </>
);

export { EmbeddedItem };