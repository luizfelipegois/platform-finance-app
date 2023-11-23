export async function getNews(topic, quant) {
  try {
    const API_URL = `https://newsapi.org/v2/everything?q=${topic}&apiKey=d7e18141631745f7b9c0eb5afdc3b1ad&language=pt&pageSize=${quant}&sortBy=publishedAt`;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();
    return result.articles;
  } catch (err) {
    return err;
  }
}
