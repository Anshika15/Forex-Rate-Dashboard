import { fetchFxRate } from '../api/currencyApi';

// Function to add a new FX pair
export const addFxPair = async (fxPairs, fromCurrency, toCurrency) => {
  const rate = await fetchFxRate(fromCurrency, toCurrency);
  const newCard = {
    id: Date.now(),
    fromCurrency: fromCurrency,
    toCurrency: toCurrency,
    rate,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return [...fxPairs, newCard];
};

// Function to remove a FX pair by ID
export const removeFxPairById = (fxPairs, id) => {
  return fxPairs.filter(pair => pair.id !== id);
};

// Function to swap FX pair currencies by ID
export const swapFxPairById = (fxPairs, id) => {
  return fxPairs.map(pair => {
    if (pair.id === id) {
      return { ...pair, fromCurrency: pair.toCurrency, toCurrency: pair.fromCurrency, updatedAt: new Date() };
    }
    return pair;
  });
};

// Function to sort FX pairs by a given field and direction
export const sortFxPairs = (fxPairs, sortField, sortDirection) => {
  const order = sortDirection === 'asc' ? 1 : -1;
  return fxPairs.sort((a, b) => {
    if (a[sortField] > b[sortField]) return order;
    if (a[sortField] < b[sortField]) return -order;
    return 0;
  });
};

// Function to remove all FX Pairs
export const removeAllFxPairs = (fxPairs) => {
  return fxPairs = [];
};
