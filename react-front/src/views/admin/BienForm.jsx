import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axios-client";
import { useValue } from "../../ContextProvider";

const BienForm = () => {
    const { id } = useParams();
    const [bien, setBien] = useState({
        id: null,
        title: "",
        description: "",
        price: "",
        model: "",
        image: null,
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { getBiens, setNotification } = useValue();
    const navigate = useNavigate();

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get("/bien/" + id)
                .then(({ data }) => {
                    setBien({ ...data, image: null });
                    setLoading(false);
                })
                .catch(({ response }) => {
                    console.log(response);
                    setLoading(false);
                });
        }, []);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(null);
        // modifier la bien
        if (bien.id) {
            axiosClient
                .post("/bien/" + bien.id, {
                    ...bien,
                    _method: "PUT",
                })
                .then(({ data }) => {
                    console.log(data.message);
                    setNotification(data.message);
                    getBiens();
                    navigate("/admin/biens");
                })
                .catch(({ response }) => {
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            // créer un nouveau bien
            console.log(bien);
            axiosClient
                .post("/bien", bien)
                .then(({ data }) => {
                    getBiens();
                    navigate("/admin/biens");
                    console.log(data.message);
                    setNotification(data.message);
                })
                .catch(({ response }) => {
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-8 ">
            {loading && <p className="mt-4">Loading...</p>}
            {errors && !loading && (
                <div className="bg-red-600 text-white rounded flex flex-col gap-2 p-2 mb-2">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
            {!loading && (
                <form
                    className="flex flex-col  gap-4 "
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <h1 className="text-2xl font-medium text-[#333]">
                        Créer un nouveau bien{" "}
                    </h1>
                    <div className="flex items-center">
                        <label htmlFor="title" className="w-1/2">
                            Titre
                        </label>
                        <label htmlFor="price" className="w-1/2">
                            Prix{" "}
                        </label>
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                        <input
                            value={bien.title}
                            id="title"
                            onChange={(e) =>
                                setBien({ ...bien, title: e.target.value })
                            }
                            type="text"
                            placeholder="Titre"
                            className="p-2 rounded border border-solid w-1/2"
                        />
                        <input
                            id="price"
                            value={bien.price}
                            onChange={(e) =>
                                setBien({ ...bien, price: e.target.value })
                            }
                            type="text"
                            placeholder="Price"
                            className="p-2 rounded border border-solid w-1/2"
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="model" className="w-1/2">
                            Modèle
                        </label>
                        <label htmlFor="image" className="w-1/2">
                            Image
                        </label>
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                        <input
                            value={bien.model}
                            id="model"
                            onChange={(e) =>
                                setBien({ ...bien, model: e.target.value })
                            }
                            type="text"
                            placeholder="Modèle"
                            className="p-2 rounded border border-solid w-1/2"
                        />
                        <input
                            id="image"
                            onChange={(e) =>
                                setBien({ ...bien, image: e.target.files[0] })
                            }
                            type="file"
                            className="p-2 rounded border border-solid w-1/2"
                        />
                    </div>
                    <label htmlFor="description">Description </label>
                    <textarea
                        id="description"
                        cols="30"
                        rows="5"
                        className="border border-solid p-2 rounded"
                        value={bien.description}
                        onChange={(e) =>
                            setBien({ ...bien, description: e.target.value })
                        }
                    ></textarea>
                    <button type="submit" className="btn-primary mx-auto">
                        Enregister{" "}
                    </button>
                </form>
            )}
        </div>
    );
};

export default BienForm;
