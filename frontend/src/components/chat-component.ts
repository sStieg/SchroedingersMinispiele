import { html, render } from "lit-html";
import { ChatService } from "../../shared/chat.service";
import { lobbyIdSubject } from "../script";

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
          <div class="${
            msg.sender === 'System'
              ? 'message-system'
              : msg.isSelf
              ? 'message-self'
              : 'message-other'
          }">
            <div class="sender">${msg.isSelf ? "You" : msg.sender}</div>
            <message-component message=${msg.message}></message-component>
          </div>
        `
      )}      
    </div>
    <div id="write-message">
      <textarea
        id="text"
        .value=${message}
        placeholder="Type your message..."
        @input=${(e: Event) =>
          onMessageInput((e.target as HTMLTextAreaElement).value)}
      ></textarea>
      <button @click=${onSend}>
        <img src="../../images/send.png" alt="Send" />
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

  connectedCallback() {
    console.log("ChatComponent connected");
    this.extractQueryParams();
    this.startChat();
    this.render();
  }

  disconnectedCallback() {
    console.log("ChatComponent disconnected");
    this.chatService.close();
  }

  private extractQueryParams() {
    const params = new URLSearchParams(window.location.search);
    this.userName = params.get("username");
    this.lobbyId = params.get("lobbyId");

    lobbyIdSubject.next(this.lobbyId);

    if (!this.userName || !this.lobbyId) {
      console.error("Missing username or lobbyId in URL parameters.");
    } else {
      console.log(`Connected as ${this.userName} in lobby ${this.lobbyId}`);
      
    }
  }

  private async startChat() {
    if (!this.lobbyId || !this.userName) {
      console.error("Cannot connect: Missing username or lobbyId.");
      return;
    }
  
    try {
      await this.chatService.connect(
        this.lobbyId,
        (message: string) => {
          const separatorIndex = message.indexOf(":");
          if (separatorIndex !== -1) {
            const sender = message.substring(0, separatorIndex).trim();
            const msg = message.substring(separatorIndex + 1).trim();
            this.onMessageReceived(sender, msg);
          } else {
            this.onMessageReceived("System", message);
          }
        },
        this.onError.bind(this)
      );
      this.chatService.sendMessage(`${this.userName} joined the Party!`);
    } catch (error) {
      console.error("Error establishing connection:", error);
    }
  }

  private onMessageReceived(sender: string, message: string) {
    if (sender === this.userName) {
      return;
    }
    if (
      sender === "System" &&
      message === `${this.userName} joined the Party!`
    ) {
      return;
    }
    this.messages.push(new MessageDisplay(message.replace(/"/g, ""), sender, false));
    this.render();
  }

  private onError(error: string) {
    console.error("SignalR Error:", error);
  }

  private onSendMessage() {
    if (!this.message.trim()) {
      console.error("Cannot send message: Missing message content.");
      return;
    }
    const formattedMessage = `${this.userName}: ${this.message}`;
    this.chatService.sendMessage(formattedMessage);
    this.messages.push(new MessageDisplay(this.message, this.userName!, true));
    this.message = "";
    this.render();
  }

  private onMessageInput(value: string) {
    this.message = value;
  }

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

customElements.define("chat-component", ChatComponent);

class MessageDisplay {
  public readonly dateTime: Date;

  constructor(
    public readonly message: string,
    public readonly sender: string,
    public readonly isSelf: boolean = false
  ) {
    this.dateTime = new Date();
  }
}