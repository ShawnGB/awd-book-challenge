const API_BASE_URL = "http://localhost:4730";

const getBooks = async (): Promise<Book[]> => {
  try {
    const fetchBooks = await fetch(API_BASE_URL + "/books");

    if (fetchBooks.ok) {
      return await fetchBooks.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { getBooks };
