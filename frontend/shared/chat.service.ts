import * as signalR from "@microsoft/signalr";

export class ChatService {
  private connection: signalR.HubConnection | null = null;

  public connect(
    lobbyId: string,
    onMessage: (msg: string) => void,
    onError: (err: string) => void
  ): Promise<void> {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://vm91.htl-leonding.ac.at/chat?lobbyId=${encodeURIComponent(lobbyId)}`, { withCredentials: false })
      .configureLogging(signalR.LogLevel.Information)
      .build();
  
    this.connection.on("ReceiveMessage", (message: string) => {
      console.log(`Message received: ${message}`);
      onMessage(message);
    });
  
    return this.connection
      .start()
      .then(() => {
        console.log("Chat connection started successfully.");
      })
      .catch((err: any) => {
        console.error("Error while starting chat connection: ", err);
        onError(err.toString());
        throw err;
      });
  }
  
  public sendMessage(message: string): void {
    if (!this.connection) {
      throw new Error("Chat connection is not established.");
    }
    this.connection.send("SendMessage", message)
      .catch(err => console.error("Error while sending message: ", err));
  }

  public close(): void {
    if (this.connection) {
      this.connection
        .stop()
        .then(() => console.log("Chat connection closed."))
        .catch(err => console.error("Error while closing chat connection: ", err));
      this.connection = null;
    }
  }
}