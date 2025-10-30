import { getBooks, searchBooks } from "./modules/api.js";
import { renderTable, updateFavoritesCount } from "./modules/render.js";

let books: Book[] = [];

//implement search function via query param book api
const searchInput = document.getElementById("search") as HTMLInputElement;
const DEBOUNCE_INTERVAL = 300;
let debounceTimer: number | undefined;

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    const query = (event.target as HTMLInputElement).value;

    debounceTimer && clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async (): Promise<void> => {
      if (query.trim() === "") {
        books = await getBooks();
      } else {
        books = await searchBooks(query);
      }

      renderTable(books);
    }, DEBOUNCE_INTERVAL);
  });
}

// initate base state
const init = async (): Promise<void> => {
  try {
    books = await getBooks();
    renderTable(books);
    updateFavoritesCount();
  } catch (error) {
    console.log(error);
  }
};

init();
