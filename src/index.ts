/* TODO
 * 1. get data (books)
 * 2. safe data (let or local storage?)
 * 3. replace table elements with data
 * 4. implent full text search via api or local?
 * 5. fetch call for detail of filter from local
 */

import { getBooks, searchBooks } from "./modules/api.js";

const searchInput = document.getElementById("search") as HTMLInputElement;
const tbody = document.querySelector("tbody") as HTMLTableSectionElement;
const DEBOUNCE_INTERVAL = 300;
let debounceTimer: number | undefined;
let books: Book[] = [];

const renderTable = (): void => {
  if (!tbody) return;

  tbody.innerHTML = books
    .map(
      (book: Book): string => `<tr>
<td>
    <button class="button button-clear fav-btn">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
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
    <button class="button" onclick="location.href='detail.html?isbn=${book.isbn}'">
        Detail
    </button>
</td>
</tr>`,
    )
    .join("");
};

//implement search function via query param book api

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

      renderTable();
    }, DEBOUNCE_INTERVAL);
  });
}
const init = async (): Promise<void> => {
  try {
    books = await getBooks();
    renderTable();
  } catch (error) {
    console.log(error);
  }
};

init();
