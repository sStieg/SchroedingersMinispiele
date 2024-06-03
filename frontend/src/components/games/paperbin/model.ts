import{BehaviorSubject} from 'rxjs'

interface GameElement {
    elementId: string
    position: Rectangle
    move: (dx: number, dy: number) => void
}

interface Point {
    x: number
    y: number
}

class Rectangle {
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

        if(x < 0) {
            x = 0;
        } else if (x > 95) {
            x = 95;
        }
        
        // assign new position
        this.position.center.x = x;
        this.position.center.y = y;  
    }
    id: number = 0
    position: Rectangle = {
        center: {
            x: 0,
            y: 0
        },
        width: 20,
        height: 20
    }
    velocityX: number = 0
    velocityY: number = 0
    elementId: string = ""
}

export class Bin {
    move(dx: number, dy: number){}	
    position: Rectangle = {
        center: {
            x: 0,
            y: 0
        },
        width: 20,
        height: 20
    }
    id: string
    width: number
    elementId: string
}

export class PaperBinGame {
    running: boolean
    isWon: boolean
    paperPlanes: PaperPlane[]
    bin: Bin
}

export interface PaperBinGameState {
    paperPlanes: PaperPlane[]
    bin: Bin
}

const initalState: PaperBinGameState = {
    paperPlanes: [],
    bin: undefined
}

export const paperbinGame: PaperBinGame = {
    running: false,
    isWon: false,
    paperPlanes: [],     
    bin: {
        move(dx: number, dy: number){
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
        },
        id: "",
        position: {
            center: {
                x: 0,
                y: 0
            },
            width: 20,
            height: 20
        },
        width: 0,
        elementId: "bin"
    }
}

export const gameState = new BehaviorSubject<PaperBinGameState>(paperbinGame)