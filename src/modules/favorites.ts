const FAVORITES_KEY = "book-favorites";

const getFavorites = (): string[] => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

const saveFavorites = (favorites: string[]): void => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

const isFavorite = (isbn: string): boolean => {
  return getFavorites().includes(isbn);
};

const addToFavorites = (isbn: string): void => {
  if (!isFavorite(isbn)) {
    const favorites = getFavorites();
    favorites.push(isbn);
    saveFavorites(favorites);
  }
};

const removeFromFavorites = (isbn: string): void => {
  let favorites = getFavorites();
  favorites = favorites.filter((favIsbn) => favIsbn !== isbn);
  saveFavorites(favorites);
};

export {
  getFavorites,
  isFavorite,
  addToFavorites,
  removeFromFavorites,
};
