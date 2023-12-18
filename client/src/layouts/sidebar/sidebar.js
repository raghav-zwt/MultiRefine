import React from 'react'
import "./sidebar.css"

const sideBar = () => {
    return (
        <aside className="left-sidebar" data-sidebarbg="skin6">
            <div className="scroll-sidebar">
                <nav className="sidebar-nav">
                    <ul id="sidebarnav">
                        <li className="sidebar-item pt-2">
                            <a
                                className="sidebar-link waves-effect waves-dark sidebar-link"
                                href="index.html"
                                aria-expanded="false"
                            >
                                <i className="far fa-clock" aria-hidden="true"></i>
                                <span className="hide-menu">Dashboard</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a
                                className="sidebar-link waves-effect waves-dark sidebar-link"
                                href="profile.html"
                                aria-expanded="false"
                            >
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <span className="hide-menu">Profile</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a
                                className="sidebar-link waves-effect waves-dark sidebar-link"
                                href="filterlist.html"
                                aria-expanded="false"
                            >
                                <i className="fa fa-table" aria-hidden="true"></i>
                                <span className="hide-menu">Filter List</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a
                                className="sidebar-link waves-effect waves-dark sidebar-link"
                                href="order.html"
                                aria-expanded="false"
                            >
                                <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
                                <span className="hide-menu">Order</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default sideBar
