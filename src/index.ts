import { getBooks } from "./modules/api.js";

console.log("JS mounted");

/* TODO
 * 1. get data (books)
 * 2. safe data (let or local storage?)
 * 3. replace table elements with data
 * 4. implent full text search via api or local?
 * 5. fetch call for detail of filter from local
 */

// should be moved to .env for prod
const tbody = document.querySelector("tbody") as HTMLTableSectionElement;

let books: Book[] = await getBooks();

console.log(books);

//tbody.innerHTML = "<tr>Test</tr>";

export {};

/*               <tr>
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
                <td>Java Web Scraping Handbook</td>
                <td>1001606140805</td>
                <td>Kevin Sahin</td>
                <td>Leanpub</td>
                <td>
                  <button class="button" onclick="location.href='detail.html'">
                    Detail
                  </button>
                </td>
              </tr>
*/
