// Add new FX pair using stored currency rates
export const addFxPair = (fxPairs, fromCurrency, toCurrency, currencyMap) => {
  const rate = calculateRate(fromCurrency, toCurrency, currencyMap);
  const newPair = {
    id: Date.now(),
    fromCurrency: fromCurrency,
    toCurrency: toCurrency,
    rate,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return [...fxPairs, newPair];
};

// Swap FX pair and calculate new rate using currencyMap
export const swapFxPairById = (fxPairs, id, currencyMap) => {
  const updatedFxPairs = fxPairs.map(pair => {
    if (pair.id === id) {
      const swappedRate = calculateRate(pair.toCurrency, pair.fromCurrency, currencyMap);
      return {
        ...pair,
        fromCurrency: pair.toCurrency,
        toCurrency: pair.fromCurrency,
        rate: swappedRate, // Calculate the swapped rate
        updatedAt: new Date()
      };
    }
    return pair;
  });

  const updatedPair = updatedFxPairs.find(pair => pair.id === id);
  const otherPairs = updatedFxPairs.filter(pair => pair.id !== id);
  console.log([updatedPair, ...otherPairs]);
  return [updatedPair, ...otherPairs]; // Return the updated pair first, followed by the others
};

// Reload FX pair using the updated currencyMap and calculate new rate
export const reloadFxPairById = (fxPairs, id, currencyMap) => {
  const updatedFxPairs = fxPairs.map(pair => {
    if (pair.id == id) {
      const newRate = calculateRate(pair.fromCurrency, pair.toCurrency, currencyMap);
      return {
        ...pair,
        rate: newRate,
        updatedAt: new Date()
      };
    }
    return pair;
  });
  
  const updatedPair = updatedFxPairs.find(pair => pair.id === id);
  const otherPairs = updatedFxPairs.filter(pair => pair.id !== id);
  return [updatedPair, ...otherPairs]; // Return the updated pair first, followed by the others
};

// Function to sort FX pairs by a given field and direction
export const sortFxPairs = (fxPairs, sortField, sortDirection) => {
  if(fxPairs != undefined && sortField != undefined && sortDirection != undefined){
  const order = sortDirection === 'asc' ? 1 : -1;
  return fxPairs.sort((a, b) => {
    if (a[sortField] > b[sortField]) return order;
    if (a[sortField] < b[sortField]) return -order;
    return 0;
  });
}
};

// Function to remove all FX Pairs
export const removeAllFxPairs = (fxPairs) => {
  return fxPairs = [];
};

// Function to remove a FX pair by ID
export const removeFxPairById = (fxPairs, id) => {
  return fxPairs.filter(pair => pair.id !== id);
};

// Helper function to calculate the rate using the currency map
const calculateRate = (fromCurrency, toCurrency, currencyMap) => {
  if (
    currencyMap[fromCurrency] && currencyMap[toCurrency]) {
    return currencyMap[toCurrency] / currencyMap[fromCurrency];
  }
  return 1; // Fallback if rate not available
};
