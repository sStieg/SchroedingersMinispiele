import { html, render } from "lit-html";
import { ChatService } from "../../shared/chat.service";

// Template function for rendering the component
const template = (
  messages: MessageDisplay[],
  message: string,
  onSend: () => void,
  onMessageInput: (value: string) => void
) => html`
  <div>
    <div id="messages">
      <h2>Today</h2>
      ${messages.map(
        (msg) => html`
          <div class="${msg.isSelf ? "message-self" : "message-other"}">
            <div class="sender">${msg.isSelf ? "You" : msg.sender}</div>
            <message-component
              message=${msg.message}>
            </message-component>
          </div>
        `
      )}
    </div>

    <div id="write-message">
      <textarea
        id="text"
        .value=${message}
        placeholder="Type your message..."
        @input=${(e: Event) => onMessageInput((e.target as HTMLTextAreaElement).value)}
      ></textarea>
      <button @click=${onSend}>
        <img src="../../images/send.png" alt="Send">
      </button>
    </div>
  </div>
`;

class ChatComponent extends HTMLElement {
  private chatService: ChatService;
  private messages: MessageDisplay[] = [];
  private message: string = "";
  private userName: string | null = null;
  private lobbyId: string | null = null;

  constructor() {
    super();
    this.chatService = new ChatService();
  }

  // Lifecycle hook when the component is added to the DOM
  connectedCallback() {
    console.log("ChatComponent connected");
    this.extractQueryParams();
    this.startChat();
    this.render();
  }

  // Lifecycle hook when the component is removed from the DOM
  disconnectedCallback() {
    console.log("ChatComponent disconnected");
    this.chatService.close();
  }

  // Extracts the username and lobbyId from the URL
  private extractQueryParams() {
    const params = new URLSearchParams(window.location.search);
    this.userName = params.get("username");
    this.lobbyId = params.get("lobbyId");

    if (!this.userName || !this.lobbyId) {
      console.error("Missing username or lobbyId in URL parameters.");
    } else {
      console.log(`Connected as ${this.userName} in lobby ${this.lobbyId}`);
    }
  }

  // Initializes the chat connection
  private startChat() {
    if (!this.userName || !this.lobbyId) {
      console.error("Cannot connect: Missing username or lobbyId.");
      return;
    }

    this.chatService.connect(
      this.userName,
      this.lobbyId,
      (message: string) => {
        const [sender, ...messageParts] = message.split(":");
        if (sender !== this.userName) {
          this.onMessageReceived(sender, messageParts.join(":").trim());
        }
      },
      this.onError.bind(this)
    );

    this.chatService.sendMessage(`${this.userName} joined the Party!`);
  }

  // Handles incoming messages from the WebSocket
  private onMessageReceived(sender: string, message: string) {
    console.log("Sender:", sender);
    console.log("User:", this.userName);
    if(sender !== ">> " + this.userName) {
        console.log("Received message:", message);
        const isSelf = sender === this.userName;
        this.messages.push(new MessageDisplay(message.replace(/"/g, ''), sender, isSelf));
        this.render();
    }
  }

  // Handles WebSocket errors
  private onError(error: string) {
    console.error("WebSocket Error:", error);
  }

  // Sends a chat message
  private onSendMessage() {
    if (!this.chatService || !this.message.trim()) {
      console.error("Cannot send message: Missing WebSocket or message content.");
      return;
    }

    try {
      console.log("Sending message:", this.message);
      this.chatService.sendMessage(`${this.message}`);
      this.messages.push(new MessageDisplay(this.message, this.userName!, true));
      this.message = ""; 
      this.render();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  // Handles input from the text area
  private onMessageInput(value: string) {
    this.message = value;
  }

  // Renders the component
  render() {
    render(
      template(
        this.messages,
        this.message,
        this.onSendMessage.bind(this),
        this.onMessageInput.bind(this)
      ),
      this
    );
  }
}

// Define the custom element
customElements.define("chat-component", ChatComponent);

// Helper class for storing messages
class MessageDisplay {
  public readonly dateTime: Date;

  constructor(
    public readonly message: string,
    public readonly sender: string,
    public readonly isSelf = false
  ) {
    this.dateTime = new Date();
  }
}
