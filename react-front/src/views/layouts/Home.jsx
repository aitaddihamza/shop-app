import { Outlet, Link } from "react-router-dom";
import cartPng from "../../images/cart.png";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="">
            <header className="bg-gray-700 sticky top-0 z-10">
                <section className="max-w-5xl mx-auto flex items-center justify-between ">
                    <Link
                        to="/"
                        className="text-2xl font-medium text-white cursor-pointer"
                    >
                        AgenceX
                    </Link>
                    <div className=" flex items-center gap-4 text-white">
                        <Link
                            className="w-[80px] h-[80px] hover:transform hover:scale-105 transition-all duration-500"
                            to="/biens/cart"
                        >
                            <img src={cartPng} alt="image" />
                        </Link>
                    </div>
                </section>
            </header>
            <Outlet />
            <Footer />
        </div>
    );
};

export default Home;
