export const BASE_URL = 'localhost:8080';

export class WebSocketClient {
  constructor(endpointUrl) {
    this.endpointUrl = endpointUrl;
    this.socket = null;
    this.messages = [];
    this.errorMessages = [];
  }

  sendMessage(message) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('Socket is closed');
    }
    this.socket.send(JSON.stringify(message));
  }

  connect() {
    this.socket = new WebSocket(this.endpointUrl);

    this.socket.addEventListener('message', (event) => {
      this.messages.push(event.data);
    });

    this.socket.addEventListener('error', (error) => {
      this.errorMessages.push(error);
    });
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
