// Add new FX pair using stored currency rates
export const addFxPair = (fxPairs, fromCurrency, toCurrency, currencyMap) => {
  try {
    if (!fromCurrency || !toCurrency) {
      throw new Error("Both fromCurrency and toCurrency must be provided.");
    }
    if (!currencyMap[fromCurrency] || !currencyMap[toCurrency]) {
      throw new Error("Currency rate not available in currencyMap.");
    }

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
  } catch (error) {
    console.error("Error adding FX pair:", error.message);
    return fxPairs; // Return the original list if there's an error
  }
};

// Swap FX pair and calculate new rate using currencyMap
export const swapFxPairById = (fxPairs, id, currencyMap) => {
  try {
    if (!fxPairs || !currencyMap) {
      throw new Error("Invalid input: fxPairs or currencyMap is missing.");
    }

    const updatedFxPairs = fxPairs.map((pair) => {
      if (pair.id === id) {
        if (!currencyMap[pair.toCurrency] || !currencyMap[pair.fromCurrency]) {
          throw new Error("Currency rate not available in currencyMap.");
        }

        const swappedRate = calculateRate(
          pair.toCurrency,
          pair.fromCurrency,
          currencyMap
        );
        return {
          ...pair,
          fromCurrency: pair.toCurrency,
          toCurrency: pair.fromCurrency,
          rate: swappedRate, // Calculate the swapped rate
          updatedAt: new Date(),
        };
      }
      return pair;
    });

    const updatedPair = updatedFxPairs.find((pair) => pair.id === id);
    if (!updatedPair) {
      throw new Error(`No FX pair found with id ${id}`);
    }

    const otherPairs = updatedFxPairs.filter((pair) => pair.id !== id);
    return [updatedPair, ...otherPairs]; // Return the updated pair first, followed by the others
  } catch (error) {
    console.error("Error swapping FX pair:", error.message);
    return fxPairs;
  }
};

// Reload FX pair using the updated currencyMap and calculate new rate
export const reloadFxPairById = (fxPairs, id, currencyMap) => {
  try {
    const updatedFxPairs = fxPairs.map((pair) => {
      if (pair.id === id) {
        if (!currencyMap[pair.fromCurrency] || !currencyMap[pair.toCurrency]) {
          throw new Error("Currency rate not available in currencyMap.");
        }

        const newRate = calculateRate(
          pair.fromCurrency,
          pair.toCurrency,
          currencyMap
        );
        return {
          ...pair,
          rate: newRate,
          updatedAt: new Date(),
        };
      }
      return pair;
    });

    const updatedPair = updatedFxPairs.find((pair) => pair.id === id);
    if (!updatedPair) {
      throw new Error(`No FX pair found with id ${id}`);
    }

    const otherPairs = updatedFxPairs.filter((pair) => pair.id !== id);
    return [updatedPair, ...otherPairs]; // Return the updated pair first, followed by the others
  } catch (error) {
    console.error("Error reloading FX pair:", error.message);
    return fxPairs;
  }
};

// Function to sort FX pairs by a given field and direction
export const sortFxPairs = (fxPairs, sortField, sortDirection) => {
  try {
    if (!fxPairs || !sortField || !sortDirection) {
      throw new Error("Missing sort parameters.");
    }

    const order = sortDirection === "asc" ? 1 : -1;
    return fxPairs.sort((a, b) => {
      if (a[sortField] > b[sortField]) return order;
      if (a[sortField] < b[sortField]) return -order;
      return 0;
    });
  } catch (error) {
    console.error("Error sorting FX pairs:", error.message);
    return fxPairs;
  }
};

// Function to remove all FX Pairs
export const removeAllFxPairs = (fxPairs) => {
  try {
    return (fxPairs = []);
  } catch (error) {
    console.error("Error removing all FX pairs:", error.message);
    return fxPairs;
  }
};

// Function to remove a FX pair by ID
export const removeFxPairById = (fxPairs, id) => {
  try {
    if (!fxPairs.some((pair) => pair.id === id)) {
      throw new Error(`No FX pair found with id ${id}`);
    }

    return fxPairs.filter((pair) => pair.id !== id);
  } catch (error) {
    console.error("Error removing FX pair:", error.message);
    return fxPairs;
  }
};

// Update FX pair timestamp on input change
export const updateFxPairTimestampById = (fxPairs, id) => {
  try {
    return fxPairs.map((pair) => {
      if (pair.id === id) {
        return {
          ...pair,
          updatedAt: new Date(), // Update timestamp
        };
      }
      return pair;
    });
  } catch (error) {
    console.error("Error updating FX pair timestamp:", error.message);
    return fxPairs;
  }
};

// Helper function to calculate the rate using the currency map
const calculateRate = (fromCurrency, toCurrency, currencyMap) => {
  try {
    if (!currencyMap[fromCurrency] || !currencyMap[toCurrency]) {
      throw new Error(
        `Rate not found for currencies: ${fromCurrency}, ${toCurrency}`
      );
    }

    return currencyMap[toCurrency] / currencyMap[fromCurrency];
  } catch (error) {
    console.error("Error calculating rate:", error.message);
    return 1; // Return fallback rate of 1 if there's an error
  }
};
