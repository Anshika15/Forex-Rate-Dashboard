const API_KEY = process.env.REACT_APP_CURRENCY_API_KEY;

export const fetchAvailableCurrencies = async () => {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
      const data = await response.json();
      return Object(data.conversion_rates); // Returns array of currency codes
    } catch (error) {
      console.error('Error fetching currencies:', error);
      return [];
    }
  };
  