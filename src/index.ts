console.log("JS mounted");

//types

interface Book {
  title: string;
  subtitle: string;
  isbn: string;
  abstract: string;
  numPages: number;
  author: string;
  publisher: string;
  price: string;
  cover: string;
}

type UpdateBook = Partial<Book>;

interface ValidationErrorDetail {
  msg: string;
  param: string;
  location: string;
}

interface ResponseError {
  errors: Record<string, ValidationErrorDetail>;
}

/* TODO
 * 1. get data (books)
 * 2. safe data (let or local storage?)
 * 3. replace table elements with data
 * 4. implent full text search via api or local?
 * 5. fetch call for detail of filter from local
 */

// should be moved to .env for prod
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

let books: Book[] = await getBooks();

console.log(books);

export {};
