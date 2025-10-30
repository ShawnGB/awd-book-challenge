import { getBooks, searchBooks } from "./modules/api.js";
import { renderTable, updateFavoritesCount } from "./modules/render.js";

let books: Book[] = [];
let currentBooks: Book[] = [];

//implement search function via query param book api
const searchInput = document.getElementById("search") as HTMLInputElement;
const DEBOUNCE_INTERVAL = 300;
let debounceTimer: number | undefined;

const filterElement = document.getElementById("filter") as HTMLSelectElement;

const populatePublisherFilter = (books: Book[]) => {
  // Clear existing options except the first one ("all")
  while (filterElement.options.length > 1) {
    filterElement.remove(1);
  }

  const publishers = [...new Set(books.map((book) => book.publisher))];
  publishers.forEach((publisher) => {
    const option = document.createElement("option");
    option.value = publisher;
    option.textContent = publisher;
    filterElement.appendChild(option);
  });
};

const handleSearch = async (query: string) => {
  if (query.trim() === "") {
    currentBooks = await getBooks();
  } else {
    currentBooks = await searchBooks(query);
  }
  // Reset filter to "all" and populate with new publishers
  filterElement.value = "all";
  populatePublisherFilter(currentBooks);
  renderTable(currentBooks);
};

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    const query = (event.target as HTMLInputElement).value;
    debounceTimer && clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => handleSearch(query), DEBOUNCE_INTERVAL);
  });
}

if (filterElement) {
  filterElement.addEventListener("change", (event) => {
    const filterValue = (event.target as HTMLSelectElement).value;
    if (filterValue === "all") {
      books = currentBooks;
    } else {
      books = currentBooks.filter((book) => book.publisher === filterValue);
    }
    renderTable(books);
  });
}

// initate base state
const init = async (): Promise<void> => {
  try {
    currentBooks = await getBooks();
    books = currentBooks;
    renderTable(books);
    populatePublisherFilter(currentBooks);
    updateFavoritesCount();
  } catch (error) {
    console.log(error);
  }
};

init();
