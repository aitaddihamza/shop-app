import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axios-client";
import { useValue } from "../../ContextProvider";

const Details = () => {
    const [bien, setBien] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useValue();

    useEffect(() => {
        axiosClient
            .get("/biens/" + id)
            .then(({ data }) => {
                setBien(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-8 flex flex-col gap-4 min-screen">
            {loading && <p className="text-center mt-2">Loading </p>}
            {!loading && (
                <div>
                    <div className="max-w-6xl mx-auto pl-8 flex flex-col gap-4">
                        <div className="flex  gap-8 ">
                            <div className="w-1/2">
                                <h1 className="text-2xl font-medium my-2 capitalize">
                                    {bien.title}
                                </h1>
                                <h1 className="text-3xl font-bold my-2">
                                    {bien.price}dh{" "}
                                </h1>
                                <p className="mt-2">{bien.description}</p>
                            </div>
                            <figure className="w-1/2">
                                <img
                                    src={`http://localhost:8000/storage/${bien.image}`}
                                    alt="img"
                                    className="w-100 "
                                />
                            </figure>
                        </div>
                        <div className="flex items-center  gap-2 mt-2 ">
                            <button
                                className="btn-primary"
                                onClick={() => {
                                    addToCart(bien.id);
                                    navigate("/biens/cart");
                                }}
                            >
                                Add{" "}
                            </button>
                            <Link to="/biens" className="btn-secondary">
                                Back{" "}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;
