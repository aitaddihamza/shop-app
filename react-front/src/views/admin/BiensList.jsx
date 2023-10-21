import { useEffect, useState } from "react";
import { useValue } from "../../ContextProvider";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axios-client";
import Pagination from "../components/Pagination";

const BiensList = () => {
    const {
        getBiens,
        biens,
        setBiens,
        loading,
        setNotification,
        currentCards,
        cardsPerPage,
        setCurrentPage,
        currentPage,
    } = useValue();

    useEffect(() => {
        getBiens();
    }, [currentPage]);

    const deleteBien = (id) => {
        axiosClient
            .delete("/bien/" + id)
            .then(({ data }) => {
                console.log(data.message);
                setNotification(data.message);
            })
            .catch((error) => {
                console.log(error);
            });
        const filterBiens = biens.filter((bien) => bien.id !== id);
        setBiens(filterBiens);
    };

    return (
        <div className="max-w-6xl mx-auto min-screen">
            <div className="flex items-center justify-between mt-6">
                <h1 className="text-xl font-medium">Les biens </h1>
                <p className="p-2"></p>
                <Link
                    to="/admin/biens/create"
                    className="btn-secondary bg-green-600"
                >
                    nouveau bien
                </Link>
            </div>
            {loading && <p>Loading...</p>}
            {!loading && biens && (
                <table className="w-[100%] mt-8 flex flex-col ">
                    <thead>
                        <tr className="flex items-center justify-between border-b border-solid shadow-sm p-2">
                            <th className="w-1/6 text-start">Image</th>
                            <th className="w-1/6 text-start ">Titre</th>
                            <th className="w-1/6 text-start">Prix</th>
                            <th className="w-1/6 text-start">Modèle</th>
                            <th className="w-1/6 text-start ">Description</th>
                            <th className="w-1/6 text-center">Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCards.map((bien) => (
                            <tr
                                key={bien.id}
                                className="flex items-center justify-between border-b border-solid p-2 shadow-sm bg-slate-50"
                            >
                                <td className="text-start">
                                    <img
                                        src={`http://localhost:8000/storage/${bien.image}`}
                                        alt="just an image"
                                        className="w-[120px] h-[140px] "
                                    />
                                </td>
                                <td className="text-center ">{bien.title}</td>
                                <td className="text-center">{bien.price}</td>
                                <td className="text-center">{bien.model}</td>
                                <td
                                    className="text-start"
                                    title={bien.description}
                                >
                                    {bien.description.length > 30
                                        ? bien.description.slice(0, 30) + "..."
                                        : bien.description}
                                </td>

                                <td className="flex items-center  gap-1 text-center">
                                    <Link
                                        to={`/admin/biens/edit/${bien.id}`}
                                        className="bg-blue-600 rounded text-white text-center p-2"
                                    >
                                        modifier
                                    </Link>
                                    <button
                                        onClick={() => deleteBien(bien.id)}
                                        className="bg-red-600 rounded text-white text-center p-2"
                                    >
                                        supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <Pagination
                        totalCards={biens.length}
                        setCurrentPage={setCurrentPage}
                        cardsPerPage={cardsPerPage}
                        currentPage={currentPage}
                    />
                </table>
            )}

            {!loading && !biens && (
                <p className="text-xl">Aucun bien a été crée </p>
            )}
        </div>
    );
};

export default BiensList;
