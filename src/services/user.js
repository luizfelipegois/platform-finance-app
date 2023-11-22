export async function userData(id, token) {
  try {
    const API_URL = `https://finance-platform-api.onrender.com/user/${id}`;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    });

    const responseData = await response.json();
    return responseData.user;
  } catch (err) {
    return err;
  }
}