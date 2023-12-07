export async function getLatestStocks() {
  try {
    const API_URL = `https://api.iex.cloud/v1/data/CORE/STOCK_COLLECTION/list?collectionName=mostactive&token=pk_3be0962c83e1461ba79bad934322ab6c`;

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function historicalForexDailyRate(symbols, last) {
  try {
    const API_URL = `https://api.iex.cloud/v1/fx/historical?symbols=EURUSD,GBPUSD&last=10&token=pk_3be0962c83e1461ba79bad934322ab6c`;

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function getHistorical(date, base, symbols) {
  try {
    const API_URL = `http://api.exchangeratesapi.io/v1/${date}?access_key=b3c7b2ce2270df1862617b9a56fbe738&base=${base}&symbols=${symbols}`;

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function getFluctuation(base, symbols, startDate, endDate) {
  try {
    const API_URL = `http://api.exchangeratesapi.io/v1/fluctuation?access_key=b3c7b2ce2270df1862617b9a56fbe738&start_date=${startDate}&end_date=${endDate}&base=${base}&symbols=${symbols}`;

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

