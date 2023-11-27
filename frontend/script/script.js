(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
let minigameBox = document.getElementById("minigame");
let button = document.getElementById("button");
button.addEventListener("click", requestGame);
function requestGame() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch("http://localhost:3000/posts/1");
        let answer = (yield response.json()).text;
        if (answer) {
            minigameBox.innerHTML += answer;
            minigameBox.innerHTML = (0, fs_1.readFileSync)("./games/pacman/pacman.html", "utf-8");
        }
        else {
            minigameBox.innerHTML = "No game available";
        }
    });
}

},{"fs":1}]},{},[2]);
