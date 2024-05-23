import React, { createContext, useState } from "react";

import {signIn as signInApi, register as registerApi} from "../apis";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const[token, setToken] = useState(localStorage.getItem("token")); //Не надо логиниться каждый раз обработка токена
    const [loading, setLoading] = useState(false);

    const signIn = async (username, password, callback) => { //Асинхронная функция
        setLoading(true);
        const response = await signInApi(username, password); //Ожидающий запрос асинхронной функции
        console.log("response", response);

        if (response && response.auth_token) { //Не надо логиниться каждый раз хранение токена
            localStorage.setItem("token", response.auth_token);
            setToken(response.auth_token);
            callback();
        }

        setLoading(false);
    }

    const signOut = () => {
        localStorage.removeItem("token");
        setToken("");
    }

    const register = async (username, password, callback) => {
        setLoading(true);
        const response = await registerApi(username, password);
        if (response && response.id) {
            callback();
        }
        setLoading(false);
    }

    const value = {
        token,
        loading,
        signIn,
        signOut,
        register,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export default AuthContext;