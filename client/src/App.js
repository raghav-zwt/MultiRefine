import './assets/css/App.css';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login.js"
import Home from "./pages/index.js"
import ErrorPage from "./pages/errorPage/errorPage.js"
import ProfilePage from './pages/profile/profile.js';
import FilterList from './pages/filterList/filterlist.js';

function App() {
  return (
    <Routes>
      <Route path={""} element={<Home />}></Route>
      <Route path={"/login"} element={<Login />}></Route>
      <Route path={"/profile"} element={<ProfilePage />}></Route>
      <Route path={"/list"} element={<FilterList />}></Route>
      <Route path={"*"} element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default App;
