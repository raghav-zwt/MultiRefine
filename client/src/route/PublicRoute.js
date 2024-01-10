import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/login.js"
import Home from "../pages/index.js"
import ErrorPage from "../pages/errorPage/errorPage.js"
import ProfilePage from '../pages/profile/profile.js';
import FilterList from '../pages/filterList/filterlist.js';
import DetailPage from '../pages/detailPage/detail.js';
import SitePage from '../pages/sitePage/site.js';
import PrivateRoute from "./PrivateRoute.js";
import SiteDetail from "../pages/siteDetail/siteDetail.js";
import ListDetails from "../pages/listDetails/listDetails.js";
import Embedded from "../pages/embedded/embedded.js";

const AppRoute = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/*"
                element={
                    <PrivateRoute>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="profile" element={<ProfilePage />} />
                            <Route path="list" element={<FilterList />} />
                            <Route path="detail/:id" element={<DetailPage />} />
                            <Route path="site" element={<SitePage />} />
                            <Route path="sitedetails/:id/:name" element={<SiteDetail />} />
                            <Route path="list/listdetails/:id" element={<ListDetails />} />
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </PrivateRoute>
                }
            />
            <Route path="/embedded_code/:query" element={<Embedded />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default AppRoute
