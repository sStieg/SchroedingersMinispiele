const BASE_URL = 'http://localhost:8080/user';

/**
 * Attempt to log the user in.
 * @param {string} username - The username to log in with.
 * @param {string} lobbyId - The lobby ID to log in to.
 * @returns {Promise<boolean>} - Resolves to `true` if login succeeds, otherwise `false`.
 */
export async function attemptUserLogin(username, lobbyId) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: username, lobbyId: lobbyId }),
    });

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
}
