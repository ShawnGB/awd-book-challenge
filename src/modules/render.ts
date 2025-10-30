import {
  getFavorites,
  isFavorite,
  addToFavorites,
  removeFromFavorites,
} from "./favorites.js";

const tbody = document.querySelector("tbody") as HTMLTableSectionElement;

const updateDisplayedBookCount = (count: number): void => {
  const bookCountHeading = document.getElementById(
    "book-count-heading",
  ) as HTMLHeadingElement;

  if (bookCountHeading) {
    bookCountHeading.textContent = `${count} Book${
      count !== 1 ? "s" : ""
    } displayed`;
  }
};

const updateFavoritesCount = (): void => {
  const favoritesCount = document.querySelector(
    ".mainnav-number",
  ) as HTMLSpanElement;
  if (favoritesCount) {
    favoritesCount.textContent = getFavorites().length.toString();
  }
};

const renderTable = (books: Book[]): void => {
  if (!tbody) return;
  updateDisplayedBookCount(books.length);
  tbody.innerHTML = books
    .map((book: Book): string => {
      const isBookFavorite = isFavorite(book.isbn);
      return `<tr>
<td>
    <button class="button button-clear fav-btn" data-isbn="${book.isbn}">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="${isBookFavorite ? "currentColor" : "none"}"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="fav"
        > 
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
        </svg>
    </button>
</td>
<td>${book.title}</td>
<td>${book.isbn}</td>
<td>${book.author}</td>
<td>${book.publisher}</td>
<td>
    <button class="button" onclick="location.href='detail.html?isbn=${
      book.isbn
    }'">
        Detail
    </button>
</td>
</tr>`;
    })
    .join("");

  const favBtns = document.querySelectorAll(".fav-btn");
  favBtns.forEach((btn) => {
    btn.addEventListener("click", handleFavoriteButtonClick);
  });
  updateFavoritesCount();
};

const handleFavoriteButtonClick = (event: Event): void => {
  const button = event.currentTarget as HTMLButtonElement;
  const isbn = button.dataset.isbn;
  const svg = button.querySelector("svg");

  if (isbn && svg) {
    if (isFavorite(isbn)) {
      removeFromFavorites(isbn);
      svg.setAttribute("fill", "none");
      if (window.location.pathname.endsWith("favorite.html")) {
        const row = button.closest("tr");
        if (row) {
          row.remove();
          const currentBookCount =
            document.querySelectorAll("tbody tr").length;
          updateDisplayedBookCount(currentBookCount);
        }
      }
    } else {
      addToFavorites(isbn);
      svg.setAttribute("fill", "currentColor");
    }
    updateFavoritesCount();
  }
};

const renderBookDetails = (book: Book): void => {
  const main = document.querySelector("main") as HTMLHtmlElement;
  if (!main) return;

  main.innerHTML = `
    <h1>
      ${book.title}<br />
      <small>${book.subtitle}</small>
    </h1>
    <section class="row">
      <div class="column column-67">
        <h3>Abstract</h3>
        <p>${book.abstract}</p>

        <h4>Details</h4>
        <ul>
          <li><strong>Author:</strong> ${book.author}</li>
          <li><strong>Publisher:</strong> ${book.publisher}</li>
          <li><strong>Pages:</strong> ${book.numPages}</li>
        </ul>

        <button
          class="button button-outline"
          onclick="location.href='index.html'"
        >
          Back
        </button>
      </div>
      <div class="column column-33">
        <img src="${book.cover}" alt="${book.title}" />
      </div>
    </section>
  `;
};

export { renderTable, renderBookDetails, updateFavoritesCount };
