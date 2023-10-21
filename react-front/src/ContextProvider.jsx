import { createContext, useContext, useState } from "react";
import axiosClient from "./api/axios-client";

const AppProvider = createContext();

export default function ContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(
        localStorage.getItem("accessToken") || null
    );
    const setToken = (token) => {
        _setToken(token);
        localStorage.setItem("accessToken", token);
    };
    const [biens, setBiens] = useState(null);
    const [loading, setLoading] = useState(true);
    const [biensCart, setBiensCart] = useState(null);
    const [notification, _setNotification] = useState(null);
    const [searchBiens, setSearchBiens] = useState(null);
    // pagination start
    const [currentCards, setCurrentCards] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 16;
    const lastIndex = currentPage * cardsPerPage;
    const firstIndex = lastIndex - cardsPerPage;
    // pagination end

    const setNotification = (message) => {
        _setNotification(`la bien a bien été ${message}`);
        setTimeout(() => {
            _setNotification(null);
        }, 5000);
    };
    const getBiens = async () => {
        try {
            const response = await axiosClient.get("/bien");
            setBiens(response.data);
            setCurrentCards(response.data.slice(firstIndex, lastIndex));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const saveData = (products) => {
        localStorage.setItem("biensCart", JSON.stringify(products));
    };

    const addToCart = (id) => {
        const products = biensCart ? biensCart : searchBiens;
        const newBiens = products.map((bien) =>
            bien.id === id ? { ...bien, added: true, count: 0 } : bien
        );
        setBiensCart(newBiens);
        setCurrentCards(newBiens.slice(firstIndex, lastIndex));
        saveData(newBiens);
    };
    return (
        <AppProvider.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                biens,
                setBiens,
                getBiens,
                loading,
                biensCart,
                setBiensCart,
                searchBiens,
                setSearchBiens,
                addToCart,
                saveData,
                notification,
                setNotification,
                currentCards,
                cardsPerPage,
                currentPage,
                setCurrentPage,
                setCurrentCards,
                firstIndex,
                lastIndex,
            }}
        >
            {children}
        </AppProvider.Provider>
    );
}

export const useValue = () => {
    return useContext(AppProvider);
};
