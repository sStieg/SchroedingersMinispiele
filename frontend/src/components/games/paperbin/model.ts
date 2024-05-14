import{BehaviorSubject} from 'rxjs'

interface GameElement {
    move: (dx: number, dy: number) => void
}

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

export class PaperPlane implements GameElement{
    move(dx: number, dy: number){
        // current position
        let x = this.position.center.x;
        let y = this.position.center.y;
                
        // calc new position
        x += dx;
        y += dy;

        if(y > 120) {
            y = 120;
            x = x-0.1;
        }

        if(x < 0) {
            x = 0;
        } else if (x > 95) {
            x = 95;
        }
        
        // assign new position
        this.position.center.x = x;
        this.position.center.y = y;  
    }

    id: string
    position: Rectangle = {
        center: {
            x: 0,
            y: 0
        },
        width: 20,
        height: 20
    }
    velocityX: number
    velocityY: number
    transform: string
    state: PaperPlaneState
    htmlElement: HTMLElement
}

export class Bin {
    move(dx, dy) {
        // current position
        let x = this.position.center.x;
        let y = this.position.center.y;
                
        // calc new position
        x += dx;
        y += dy;
    
        if(x < 0) {
            x = 0;
        } else if (x > 95) {
            x = 95;
        }
                
        // assign new position
        this.position.center.x = x;
        this.position.center.y = y;  
    }	

    id: string
    position: Rectangle = {
        center: {
            x: 0,
            y: 0
        },
        width: 20,
        height: 20
    }
    width: number
}

export interface PaperBinGameState {
    paperPlanes: PaperPlane[]
    bin: Bin
}

const initalState: PaperBinGameState = {
    paperPlanes: [],
    bin: undefined
}

export const store = new BehaviorSubject<PaperBinGameState>(initalState)