import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        auth_id: null,
        email: "",
    });

    axios.defaults.headers.common["Authorization"] = auth?.auth_id;

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                auth_id: parseData.auth_id,
                email: parseData.email,
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