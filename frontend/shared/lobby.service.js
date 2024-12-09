import { BASE_URL } from './util.js';

const LOBBY_API_URL = `http://${BASE_URL}/lobby/`;

export async function requestLobbyStatus(lobbyId) {
  try {
    const response = await fetch(LOBBY_API_URL + lobbyId);
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error checking lobby status:', error);
    return false;
  }
}
