import { getBook } from "./modules/api.js";
import { renderBookDetails, updateFavoritesCount } from "./modules/render.js";

const init = async (): Promise<void> => {
  const urlParams = new URLSearchParams(window.location.search);
  const isbn = urlParams.get("isbn");

  if (isbn) {
    const book = await getBook(isbn);
    if (book) {
      renderBookDetails(book);
    } else {
      const main = document.querySelector("main");
      if (main) {
        main.innerHTML = "<h1>Book not found</h1>";
      }
    }
  } else {
    const main = document.querySelector("main");
    if (main) {
      main.innerHTML = "<h1>No book ISBN provided</h1>";
    }
  }
  updateFavoritesCount();
};

init();
