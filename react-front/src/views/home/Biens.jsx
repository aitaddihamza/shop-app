import { useEffect, useState } from "react";
import { useValue } from "../../ContextProvider";
import Card from "../components/Card";
import axios from "axios";
import Pagination from "../components/Pagination";

const Biens = () => {
    const {
        biensCart,
        setBiensCart,
        searchBiens,
        setSearchBiens,
        currentCards,
        setCurrentCards,
        cardsPerPage,
        currentPage,
        setCurrentPage,
        firstIndex,
        lastIndex,
    } = useValue();
    const [searchTitle, setSearchTitle] = useState("");
    const [searchPrice, setSearchPrice] = useState("");
    const [searchModel, setSearchModel] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBiensCart = async () => {
            try {
                const data = await JSON.parse(
                    localStorage.getItem("biensCart")
                );
                if (data) {
                    setBiensCart(data);
                    setCurrentCards(data.slice(firstIndex, lastIndex));
                } else {
                    const response = await axios.get(
                        "http://localhost:8000/api/biens"
                    );
                    const data = response.data;
                    setBiensCart(
                        data.map((data) => {
                            return {
                                ...data,
                                count: -1,
                            };
                        })
                    );
                    setCurrentCards(response.data.slice(firstIndex, lastIndex));
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getBiensCart();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        let filterBiens = biensCart;
        if (searchPrice) {
            filterBiens = filterBiens.filter(
                (bien) => bien.price <= searchPrice
            );
        }
        if (searchModel) {
            filterBiens = filterBiens.filter(
                (bien) => bien.model == searchModel
            );
        }
        if (searchTitle) {
            filterBiens = filterBiens.filter((bien) =>
                bien.title.toLowerCase().includes(searchTitle.toLowerCase())
            );
        }
        setSearchBiens(filterBiens);
    };
    return (
        <div className="max-w-6xl mx-auto mt-4">
            <form
                className="flex gap-2 items-end justify-center mb-4"
                onSubmit={(e) => handleSearch(e)}
            >
                <input
                    value={searchTitle}
                    onChange={(e) => {
                        setSearchTitle(e.target.value);
                    }}
                    placeholder="mot cle"
                    className="w-1/4 border border-solid rounded p-2"
                />
                <input
                    value={searchPrice}
                    onChange={(e) => {
                        setSearchPrice(e.target.value);
                    }}
                    placeholder="prix maximum"
                    className="w-1/4 border border-solid rounded p-2"
                    type="number"
                />
                <input
                    value={searchModel}
                    onChange={(e) => {
                        setSearchModel(e.target.value);
                    }}
                    placeholder="modèle"
                    className="w-1/4 border border-solid rounded p-2"
                    type="number"
                />
                <button className="btn-primary">Rechercher</button>
            </form>
            <div className="flex flex-col">
                <div className="flex flex-wrap gap-4 mt-2 justify-center">
                    {loading && <p>Loading...</p>}
                    {!loading &&
                        !searchBiens &&
                        biensCart &&
                        currentCards.map((bien) => (
                            <Card
                                key={bien.id}
                                id={bien.id}
                                title={bien.title}
                                price={bien.price}
                                description={bien.description}
                                image={bien.image}
                                added={bien.added}
                            />
                        ))}

                    {!loading &&
                        searchBiens &&
                        biensCart &&
                        searchBiens.map((bien) => (
                            <Card
                                key={bien.id}
                                id={bien.id}
                                title={bien.title}
                                price={bien.price}
                                description={bien.description}
                                image={bien.image}
                            />
                        ))}
                    {!loading && searchBiens && !searchBiens.length && (
                        <p>Aucun bien n'est correspond à vos recherches !</p>
                    )}
                </div>
                <Pagination
                    totalCards={biensCart?.length}
                    setCurrentPage={setCurrentPage}
                    cardsPerPage={cardsPerPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

export default Biens;
