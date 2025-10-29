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

const getBook = async (isbn: string): Promise<Book | undefined> => {
  try {
    const fetchBook = await fetch(API_BASE_URL + `/books/${isbn}`);

    if (fetchBook.ok) {
      return await fetchBook.json();
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const searchBooks = async (searchQuery: string): Promise<Book[]> => {
  try {
    const fetchBooks = await fetch(API_BASE_URL + `/books?q=${searchQuery}`);

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
export { getBooks, getBook, searchBooks };
