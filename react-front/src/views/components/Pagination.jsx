const Pagination = ({
    totalCards,
    setCurrentPage,
    cardsPerPage,
    currentPage,
}) => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="p-2 max-w-4xl mx-auto flex items-center gap-2 sticky bottom-0 my-4">
            <button
                onClick={() =>
                    setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)
                }
                className="bg-blue-600 text-center w-8 text-blue-600 border hover:text-white hover:bg-blue-600  border-solid border-blue-700 bg-transparent"
            >
                {"<<"}
            </button>
            {pages.map((index) => (
                <button
                    onClick={() => setCurrentPage(index)}
                    style={
                        currentPage === index
                            ? { backgroundColor: "blue", color: "white" }
                            : null
                    }
                    className="bg-blue-600 text-center w-8 text-blue-600 border hover:text-white hover:bg-blue-600  border-solid border-blue-700 bg-transparent"
                    key={index}
                >
                    {index}
                </button>
            ))}
            <button
                onClick={() =>
                    setCurrentPage(
                        currentPage === pages.length
                            ? pages.length
                            : currentPage + 1
                    )
                }
                className="bg-blue-600 text-center w-8 text-blue-600 border hover:text-white hover:bg-blue-600  border-solid border-blue-700 bg-transparent"
            >
                {">>"}
            </button>
        </div>
    );
};

export default Pagination;
