import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        auth_id: null,
        token: "",
    });

    axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

    useEffect(() => {
        const data = localStorage.getItem("auth");
        const token = localStorage.getItem("token");
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                auth_id: parseData[0].auth_id,
                token: token,
            });
        }
        //  eslint-disable-next-line
    }, []);
    return (
        <authContext.Provider value={[auth, setAuth]}>
            {children}
        </authContext.Provider>
    );
};

const UseAuth = () => useContext(authContext);

export { UseAuth, AuthProvider };