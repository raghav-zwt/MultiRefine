import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        auth_id: null,
        token: "",
    });

    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                auth_id: parseData.auth_id,
                token: parseData.token,
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