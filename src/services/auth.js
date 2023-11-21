export async function signIn(email, password) {
  try {
    const API_URL = 'https://finance-platform-api.onrender.com/auth/signIn';
    const data = {
      email,
      password
    };
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}