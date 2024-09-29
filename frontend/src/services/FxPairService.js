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
export const swapFxPairById = async (fxPairs, id) => {
  return Promise.all(
    fxPairs.map(async (pair) => {
      if (pair.id === id) {
        // Swap currencies
        const newRate = await fetchFxRate(pair.toCurrency, pair.fromCurrency);
        return {
          ...pair,
          fromCurrency: pair.toCurrency,
          toCurrency: pair.fromCurrency,
          rate: newRate, // Update the rate for swapped currencies
          updatedAt: new Date(),
        };
      }
      return pair;
    })
  );
};

// Function to reload the FX rate for a specific pair by ID
export const reloadFxPairById = async (fxPairs, id) => {
  return Promise.all(
    fxPairs.map(async (pair) => {
      if (pair.id === id) {
        const newRate = await fetchFxRate(pair.fromCurrency, pair.toCurrency);
        return { ...pair, rate: newRate, updatedAt: new Date() };
      }
      return pair;
    })
  );
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
