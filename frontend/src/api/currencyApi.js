export const fetchAvailableCurrencies = async () => {
    try {
      const response = await fetch('https://freecurrencyapi.com/api/v1/currencies');
      const data = await response.json();
      return Object.keys(data); // Returns array of currency codes
    } catch (error) {
      console.error('Error fetching currencies:', error);
      return [];
    }
  };
  
  export const fetchFxRate = async (from, to) => {
    try {
      const response = await fetch(`https://freecurrencyapi.com/api/v1/latest?base=${from}&symbols=${to}`);
      const data = await response.json();
      return data.rates[to];
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      return 0;
    }
  };
  