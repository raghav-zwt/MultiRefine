import React from 'react'
import { Link } from "react-router-dom";
import "./sidebar.css"

const sideBar = () => {
    return (
        <aside className="left-sidebar" data-sidebarbg="skin6">
            <div className="scroll-sidebar">
                <nav className="sidebar-nav">
                    <ul id="sidebarnav">
                        <li className="sidebar-item pt-2">
                            <Link
                                className="sidebar-link waves-effect waves-dark sidebar-link"
                                to={"/"}
                                aria-expanded="false"
                            >
                                <i className="far fa-clock" aria-hidden="true"></i>
                                <span className="hide-menu">Dashboard</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link
                                className="sidebar-link waves-effect waves-dark sidebar-link"
                                to={"/profile"}
                                aria-expanded="false"
                            >
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <span className="hide-menu">Profile</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link
                                className="sidebar-link waves-effect waves-dark sidebar-link"
                                to={"/list"}
                                aria-expanded="false"
                            >
                                <i className="fa fa-table" aria-hidden="true"></i>
                                <span className="hide-menu">Filter List</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default sideBar
