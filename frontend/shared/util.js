"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketClosed = exports.WebSocket = exports.BASE_URL = void 0;
var webSocket_1 = require("rxjs/webSocket");
var rxjs_1 = require("rxjs");
exports.BASE_URL = 'vm91.htl-leonding.ac.at/api/v1';
var WebSocket = /** @class */ (function () {
    function WebSocket(endpointUrl) {
        this.endpointUrl = endpointUrl;
        this.socket = null;
        this.messages = new rxjs_1.Subject();
        this.errorMessages = new rxjs_1.Subject();
    }
    WebSocket.prototype.sendMessage = function (message) {
        var _a, _b;
        if ((_a = this.socket) === null || _a === void 0 ? void 0 : _a.closed) {
            throw new SocketClosed();
        }
        (_b = this.socket) === null || _b === void 0 ? void 0 : _b.next(message);
    };
    WebSocket.prototype.connect = function () {
        var _this = this;
        this.socket = (0, webSocket_1.webSocket)({
            url: this.endpointUrl,
            deserializer: function (msg) { return msg.data; }
        });
        this.socket.subscribe({
            next: function (msg) {
                _this.messages.next(msg);
            },
            error: function (eMsg) {
                _this.errorMessages.next(eMsg);
            }
        });
    };
    WebSocket.prototype.close = function () {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.complete();
    };
    Object.defineProperty(WebSocket.prototype, "closed", {
        get: function () {
            var _a;
            return (_a = this.socket) === null || _a === void 0 ? void 0 : _a.closed;
        },
        enumerable: false,
        configurable: true
    });
    return WebSocket;
}());
exports.WebSocket = WebSocket;
var SocketClosed = /** @class */ (function (_super) {
    __extends(SocketClosed, _super);
    function SocketClosed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SocketClosed;
}(Error));
exports.SocketClosed = SocketClosed;
