import {BehaviorSubject} from "rxjs";
import {GameElement} from "../interfaces/GameElement";
import {Rectangle} from "../interfaces/Rectangle";

export class Basketball implements GameElement {
    move(dx: number, dy: number): void {}
    position: Rectangle;
    elementId: string;
    fallLimit: number;
}

export class BasketballGame {
    isWon: boolean
    basketball: Basketball
    basket: GameElement
    obstacles: GameElement[]
    moveBall(dx: number, dy: number): any {}
}

export const basketBallGame: BasketballGame = {
    isWon: false,
    basketball: {
        position: {
            leftTop: {
                x: 0,
                y: 0
            },
            width: 0,
            height: 0
        },
        elementId: "basketball",
        move: function (dx: number, dy: number): void {
            // calc new position
            this.position.leftTop.x += dx;
            this.position.leftTop.y += dy;

            if(this.position.leftTop.x < 0) {
                this.position.leftTop.x = 0;
            } else if (this.position.leftTop.x > 95) {
                this.position.leftTop.x = 95;
            }

            if(this.position.leftTop.y < this.fallLimit) {
                this.position.leftTop.y = this.fallLimit;
            }


        },
        fallLimit: 0
    },
    basket: {
        position: {
            leftTop: {
                x: 0,
                y: 0
            },
            width: 0,
            height: 0
        },
        elementId: "basket"
    },
    obstacles: [],
    moveBall(dx: number, dy: number): any {
        this.basketball.fallLimit = 0;
        let x = this.basketball.position.leftTop.x + dx;
        let y = this.basketball.position.leftTop.y + dy;
        for(let currObstacle of this.obstacles) {
            if(x + 4 > parseFloat(currObstacle.position.leftTop.x) && x < parseFloat(currObstacle.position.leftTop.x) + currObstacle.position.width) {
                if(parseFloat(this.basketball.position.leftTop.y) >= parseFloat(currObstacle.position.leftTop.y) + currObstacle.position.height ) {
                    this.basketball.fallLimit = parseFloat(currObstacle.position.leftTop.y) + currObstacle.position.height;
                } else if (!(parseFloat(this.basketball.position.leftTop.y)+5 < parseFloat(currObstacle.position.leftTop.y))) {
                    dx = 0;
                }
            }
        }

        this.basketball.move(dx,dy);
    }
}

export const basketballGameState = new BehaviorSubject<BasketballGame>(basketBallGame);
