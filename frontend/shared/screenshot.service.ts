import * as signalR from "@microsoft/signalr";
export class ScreenshotService {
    private connection: signalR.HubConnection;
    private hubUrl: string;

    constructor(hubUrl: string) {
        this.hubUrl = hubUrl;
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(this.hubUrl)
            .build();
    }

    public async connect(): Promise<void> {
        try {
            await this.connection.start();
            console.log("Connected to SignalR hub.");
        } catch (err) {
            console.error("SignalR connection error:", err);
        }
    }

    public onNewScreenshot(callback: (base64Image: string) => void): void {
        this.connection.on("NewScreenshot", callback);
    }
}