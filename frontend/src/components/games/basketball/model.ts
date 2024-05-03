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

interface GameElement {
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
    basketball: Basketball
    basket: GameElement
    obstacles: GameElement[]
    checkObstacles(dx: number, dy: number): any {}
    isMoveAllowed(dx: number, dy: number): any {}
}

const basketBallGame: BasketballGame = {
    basketball: {
        position: {
            center: {
                x: 0,
                y: 0
            },
            width: 100,
            height: 100
        },
        elementId: "",
        move: function (dx: number, dy: number): void {
            let x = this.position.center.x;
            let y = this.position.center.y;

            // calc new position
            this.position.center.x += dx;
            y += dy;

            if(this.position.center.x < 0) {
                this.position.center.x = 0;
            } else if (this.position.center.x > 95) {
                this.position.center.x = 95;
            }

            if(y < this.fallLimit) {
                y = this.fallLimit;
            }

            this.fallLimit = 0;
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
        elementId: ""
    },
    obstacles: [],
    checkObstacles(dx: number, dy: number): any {
        for(let currObstacle of this.obstacles) {
            if(dx + 4 > parseFloat(currObstacle.position.center.x) && dx < parseFloat(currObstacle.position.center.x) + currObstacle.position.width) {
                if(parseFloat(this.basketball.position.center.y) >= parseFloat(currObstacle.position.center.y) + currObstacle.position.height ) {
                    this.basketball.fallLimit = parseFloat(currObstacle.position.center.y) + currObstacle.position.height;
                } else if (!(parseFloat(this.basketball.position.center.y)+5 < parseFloat(currObstacle.position.center.y))) {
                    return true;
                }

            }
        }

        return false;
    },
    isMoveAllowed(dx: number, dy: number): any {
    }
}

export const gameState = new BehaviorSubject<BasketballGame>(basketBallGame);
