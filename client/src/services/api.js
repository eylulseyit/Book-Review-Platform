const BASE_URL = "http://localhost:5000/api";

export const fetchBooks = async () => {
    const response = await fetch(`${BASE_URL}/books`);
    return response.json();
};

export const addBook = async (book) => {
    const response = await fetch(`${BASE_URL}/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });
    return response.json();
};
