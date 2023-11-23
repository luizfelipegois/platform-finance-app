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

export async function changeEmail(id, token, email) {
  try {
    const API_URL = `https://finance-platform-api.onrender.com/auth/newEmail/${id}`;
    const data = {
      email
    };
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function changePassword(id, token, password) {
  try {
    const API_URL = `https://finance-platform-api.onrender.com/auth/newPassword/${id}`;
    const data = {
      password
    };
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function changePhone(id, token, phone) {
  try {
    const API_URL = `https://finance-platform-api.onrender.com/auth/newPhone/${id}`;
    const data = {
      phone
    };
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}
