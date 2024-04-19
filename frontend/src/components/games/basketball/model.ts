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

interface Basketball {
    position: Rectangle
    state: BasketballState
}

interface Basket {
    positionY: number
    width: number
}

export interface BasketballGame {
    basketball: Basketball
    basket: Basket
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
        state: BasketballState.DUNKED
    },
    basket: undefined
}

export const store = new BehaviorSubject<BasketballGame>(basketBallGame);
