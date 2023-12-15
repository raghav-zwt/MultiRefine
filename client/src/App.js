import './assets/css/App.css';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login.js"
import Home from "./pages/index.js"
import ErrorPage from "./pages/errorPage/errorPage.js"

function App() {
  return (
    <Routes>
      <Route path={""} element={<Home />}></Route>
      <Route path={"/callback"} element={<Login />}></Route>
      <Route path={"*"} element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default App;
