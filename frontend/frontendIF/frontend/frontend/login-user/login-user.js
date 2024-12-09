import { attemptUserLogin } from '../shared/user.service.js';

document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('username');
  const startChatButton = document.getElementById('start-chat-btn');
  const loadingIndicator = document.getElementById('loading');

  // Extract the lobbyId from the URL path
  /*const pathSegments = window.location.pathname.split('/');
  const lobbyId = pathSegments.length > 2 ? pathSegments[2] : null;*/
  const params = new URLSearchParams(window.location.search);
  const lobbyId = params.get('lobbyId');

  if (!lobbyId) {
    alert('Lobby ID is missing!');
    return;
  }

  usernameInput.addEventListener('input', () => {
    startChatButton.disabled = !usernameInput.value.trim();
  });

  startChatButton.addEventListener('click', async () => {
    loadingIndicator.style.display = 'block';
    const username = usernameInput.value.trim();

    const success = await attemptUserLogin(username, lobbyId);
    loadingIndicator.style.display = 'none';

    if (success) {
      // Redirect with lobbyId and username
    window.location.href = `/main.html?lobbyId=${lobbyId}&username=${encodeURIComponent(username)}`;
    } else {
      alert('Name already taken!');
      usernameInput.value = '';
    }
  });
});
