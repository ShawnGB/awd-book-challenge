import { getFavorites } from "./modules/favorites.js";
import { getBooks } from "./modules/api.js";
import { renderTable, updateFavoritesCount } from "./modules/render.js";

const init = async (): Promise<void> => {
  try {
    const favoriteIsbns: string[] = getFavorites();
    const books: Book[] = await getBooks();

    const favoriteBooks: Book[] = books.filter((book) =>
      favoriteIsbns.includes(book.isbn),
    );

    renderTable(favoriteBooks);
    updateFavoritesCount();
  } catch (error) {
    console.error("Error initializing favorites page:", error);
  }
};

init();
