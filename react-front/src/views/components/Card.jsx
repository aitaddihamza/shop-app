import { Link } from "react-router-dom";
import { useValue } from "../../ContextProvider";

const Card = ({ id, title, price, description, image, added }) => {
    const { addToCart } = useValue();

    return (
        <div className="w-[250px] h-[440px] p-2 hover:shadow-xl border border-solid relative">
            <div className="w-[100%] flex justify-end absolute right-2">
                <h1>
                    {added && (
                        <p className="text-white bg-blue-500 p-1">
                            in the cart{" "}
                        </p>
                    )}
                </h1>
            </div>
            <figure className="h[120px]">
                <img
                    src={`http://localhost:8000/storage/${image}`}
                    alt="img"
                    className="w-100"
                />
            </figure>
            <h1 className="font-medium ">{title} </h1>
            <h1 className="font-bold text-red-600 mt-1">{price} dh</h1>
            <p className="mb-1">
                {description.length <= 30
                    ? description
                    : description.slice(0, 30) + "..."}
            </p>

            <div className="flex gap-1 absolute bottom-3">
                <Link to={`/biens/details/${id}`} className="btn-secondary">
                    Voir plus
                </Link>
                <button className="btn-primary" onClick={() => addToCart(id)}>
                    ajouter au panier
                </button>
            </div>
        </div>
    );
};

export default Card;
