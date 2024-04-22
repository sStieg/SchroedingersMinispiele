import{BehaviorSubject} from 'rxjs'

interface Point {
    x: number
    y: number
}

interface Rectangle {
    center: Point
    width: number
    height: number
}

enum PaperPlaneState {
    FLYING,
    CRASHED,
    COLLECTED
}

interface PaperPlane {
    position: Rectangle
    transform: string
    state: PaperPlaneState
}

interface Bin {
    position: number
    width: number
}

export interface PaperBinGame {
    paperPlanes: PaperPlane[]
    bin: Bin
}

const initalState: PaperBinGame = {
    paperPlanes: [
        {
            position: {
                center: {
                    x: 0,
                    y: 0
                },
                width: 10,
                height: 10
            },
            transform: "",
            state: PaperPlaneState.FLYING
        }
    ],
    bin: undefined
}

export const store = new BehaviorSubject<PaperBinGame>(initalState)