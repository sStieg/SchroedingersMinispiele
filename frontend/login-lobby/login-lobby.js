import { requestLobbyStatus } from '../shared/lobby.service.js';

document.addEventListener('DOMContentLoaded', () => {
  const lobbyInput = document.getElementById('lobby-id');
  const joinButton = document.getElementById('join-lobby-btn');
  const loadingIndicator = document.getElementById('loading');

  // Enable or disable the button based on input
  lobbyInput.addEventListener('input', () => {
    joinButton.disabled = !lobbyInput.value.trim();
  });

  // Handle lobby join button click
  joinButton.addEventListener('click', async () => {
    loadingIndicator.style.display = 'block';
    const lobbyId = lobbyInput.value.trim();
    const lobbyExists = await requestLobbyStatus(lobbyId);

    loadingIndicator.style.display = 'none';
    if (lobbyExists) {
      //window.location.href = `/login-user/${lobbyId}`;
      window.location.href = `/login-user.html?lobbyId=${lobbyId}`;
    } else {
      alert('Lobby does not exist!');
    }
  });
});
