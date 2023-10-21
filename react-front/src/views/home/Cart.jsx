import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useValue } from "../../ContextProvider";

const Cart = () => {
    const { saveData, biensCart, setBiensCart } = useValue();
    const [filterBiens, setFilterBiens] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await JSON.parse(
                    localStorage.getItem("biensCart")
                );
                setBiensCart(data);
                setFilterBiens(data.filter((bien) => bien.added));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    const deleteItem = (id) => {
        const newBiens = biensCart.map((bien) =>
            bien.id === id ? { ...bien, added: false, count: 0 } : bien
        );
        saveData(newBiens);
        setFilterBiens(filterBiens.filter((bien) => bien.id !== id));
        setBiensCart(newBiens);
    };

    const increment = (id) => {
        const newBiensCart = biensCart.map((bien) =>
            bien.id === id ? { ...bien, count: (bien.count += 1) } : bien
        );
        const newFilterBiens = filterBiens.map((bien) =>
            bien.id === id ? { ...bien, count: (bien.count += 1) } : bien
        );
        saveData(newBiensCart);
        setFilterBiens(newFilterBiens);
    };

    const decrement = (id) => {
        const bienCount = filterBiens.filter((bien) => bien.id === id)[0].count;
        if (bienCount <= 1) deleteItem(id);
        else {
            const newFilterBiens = filterBiens.map((bien) =>
                bien.id === id
                    ? {
                          ...bien,
                          count: (bien.count -= 1),
                      }
                    : bien
            );
            const newBiensCart = biensCart.map((bien) =>
                bien.id === id
                    ? {
                          ...bien,
                          count: (bien.count -= 1),
                      }
                    : bien
            );
            saveData(newBiensCart);
            setFilterBiens(newFilterBiens);
        }
    };

    return (
        <table className="max-w-6xl mx-auto mt-8  w-[100%] min-screen">
            <thead>
                <tr className="flex items-center justify-between border-b border-solid shadow-sm p-2">
                    <th className="w-1/6 text-center ">Produist </th>
                    <th className="w-1/6 text-center ">Nom </th>
                    <th className="w-1/6 text-center ">Prix </th>
                    <th className="w-1/6 text-center ">Quantité </th>
                    <th className="w-1/6 text-center ">Supprimer</th>
                    <th className="w-1/6 text-center ">Total</th>
                </tr>
            </thead>
            {loading && (
                <tbody className="flex items-end justify-center">
                    <tr>
                        <td className="text-xl text-center pt-4">Loading...</td>
                    </tr>
                </tbody>
            )}
            {!loading && filterBiens && (
                <tbody>
                    {filterBiens.map((bien) => (
                        <tr
                            key={bien.id}
                            className="flex items-center justify-between border-b border-solid p-2 shadow-sm bg-slate-50"
                        >
                            <td className="w-1/6 text-center grid place-content-center">
                                <img
                                    src={`http://localhost:8000/storage/${bien.image}`}
                                    alt="just an image"
                                    className="w-[120px] h-[140px] "
                                />
                            </td>
                            <td className="w-1/6 text-center ">{bien.title}</td>
                            <td className="w-1/6 text-center">{bien.price}</td>
                            <td className="w-1/6 text-center flex justify-center gap-2 items-center">
                                <button
                                    className="w-10 h-10 border border-solid grid place-content-center text-2xl hover:bg-blue-600 hover:text-white "
                                    onClick={() => increment(bien.id)}
                                >
                                    +
                                </button>
                                <span className="w-10 h-10 border border-solid grid place-content-center text-2xl">
                                    {bien.count === 0 ? 1 : bien.count}
                                </span>
                                <button
                                    className="w-10 h-10 border border-solid grid place-content-center text-2xl hover:bg-red-600 hover:text-white "
                                    onClick={() => decrement(bien.id)}
                                >
                                    -
                                </button>
                            </td>
                            <td
                                className="w-1/6 text-center grid place-content-center"
                                onClick={() => deleteItem(bien.id)}
                            >
                                <FaTrashAlt className="text-blue-600 text-2xl hover:text-red-600 duration-500 transition-all" />
                            </td>
                            <td className="w-1/6 text-center">
                                {bien.count === 0
                                    ? bien.price
                                    : bien.count * bien.price}
                                DH
                            </td>
                        </tr>
                    ))}
                </tbody>
            )}

            {!loading && !filterBiens?.length && (
                <tbody className="flex items-end justify-center">
                    <tr>
                        <td className="text-4xl text-center pt-[8rem] font-medium">
                            Votre panier est vide
                        </td>
                    </tr>
                </tbody>
            )}
        </table>
    );
};

export default Cart;
