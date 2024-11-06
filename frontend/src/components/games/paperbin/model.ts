import{BehaviorSubject} from 'rxjs'
import {GameElement} from "../interfaces/GameElement";
import {Rectangle} from "../interfaces/Rectangle";

export class PaperPlane implements GameElement{
    move(dx: number, dy: number){
        // current position
        let x = this.position.leftTop.x;
        let y = this.position.leftTop.y;

        // calc new position
        x += dx;
        y += dy;

        if(x < 0) {
            x = 0;
        } else if (x > 80) {
            x = 80;
        }

        // assign new position
        this.position.leftTop.x = x;
        this.position.leftTop.y = y;
    }
    elementId: string
    position: Rectangle = {
        leftTop: {
            x: 0,
            y: 0
        },
        width: 0,
        height: 0
    }
    velocityX: number = 0
    velocityY: number = 0
}

export class Bin {
    move(dx: number, dy: number){}	
    position: Rectangle = {
        leftTop: {
            x: 0,
            y: 0
        },
        width: 0,
        height: 0
    }
    id: string
}

export class PaperBinGame {
    isWon: boolean
    paperPlanes: PaperPlane[]
    bin: Bin
}

export interface PaperBinGameState {
    paperPlanes: PaperPlane[]
    bin: Bin
}

export const paperbinGame: PaperBinGame = {
    isWon: false,
    paperPlanes: [],     
    bin: {
        move(dx: number, dy: number){
            // current position
            let x = this.position.leftTop.x;
            let y = this.position.leftTop.y;

            // calc new position
            x += dx;
            y += dy;

            if(x < 0) {
                x = 0;
            } else if (x > 80) {
                x = 80;
            }

            // assign new position
            this.position.leftTop.x = x;
            this.position.leftTop.y = y;
        },
        position: {
            leftTop: {
                x: 0,
                y: 0
            },
            width: 30,
            height: 35
        },
        id: "sprite"
    }
}

export const paperBinGameState = new BehaviorSubject<PaperBinGameState>(paperbinGame)