import {BehaviorSubject} from "rxjs";

interface Point {
    x: number
    y: number
}

interface Rectangle {
    center: Point
    width: number
    height: number
}

enum BasketballState {
    DUNKED,
    MISSED
}

export class GameElement {
    elementId: string
    position: Rectangle
}

export class Basketball implements GameElement {
    move(dx: number, dy: number): void {}
    position: Rectangle;
    elementId: string;
    fallLimit: number;
}

export class BasketballGame {
    running: boolean
    basketball: Basketball
    basket: GameElement
    obstacles: GameElement[]
    moveBall(dx: number, dy: number): any {}
}

export const basketBallGame: BasketballGame = {
    running: false,
    basketball: {
        position: {
            center: {
                x: 0,
                y: 0
            },
            width: 0,
            height: 0
        },
        elementId: "basketball",
        move: function (dx: number, dy: number): void {
            // calc new position
            this.position.center.x += dx;
            this.position.center.y += dy;

            if(this.position.center.x < 0) {
                this.position.center.x = 0;
            } else if (this.position.center.x > 95) {
                this.position.center.x = 95;
            }

            if(this.position.center.y < this.fallLimit) {
                this.position.center.y = this.fallLimit;
            }


        },
        fallLimit: 0
    },
    basket: {
        position: {
            center: {
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
        let x = this.basketball.position.center.x + dx;
        let y = this.basketball.position.center.y + dy;
        for(let currObstacle of this.obstacles) {
            if(x + 4 > parseFloat(currObstacle.position.center.x) && x < parseFloat(currObstacle.position.center.x) + currObstacle.position.width) {
                if(parseFloat(this.basketball.position.center.y) >= parseFloat(currObstacle.position.center.y) + currObstacle.position.height ) {
                    this.basketball.fallLimit = parseFloat(currObstacle.position.center.y) + currObstacle.position.height;
                } else if (!(parseFloat(this.basketball.position.center.y)+5 < parseFloat(currObstacle.position.center.y))) {
                    dx = 0;
                }
            }
        }

        this.basketball.move(dx,dy);
    }
}

export const gameState = new BehaviorSubject<BasketballGame>(basketBallGame);
