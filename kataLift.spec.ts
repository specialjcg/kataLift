enum Direction {
    UP,
    DOWN
}

class Elevator {
    private nextFloorsUp: Floor[]=[];
    private nextFloorsDown:Floor[]=[];
    private direction:Direction=Direction.UP
    constructor(public floor: Floor = Floor.GROUND) {

    }


    go() {
        if (this.direction===Direction.UP){
            this.floor = this.nextFloorsUp.pop()||Floor.GROUND;
            if (!this.nextFloorsUp.length) this.direction=Direction.DOWN;
            return;
        }else{
            this.floor = this.nextFloorsDown.pop()||Floor.GROUND;
            if (!this.nextFloorsDown.length) this.direction=Direction.UP;
            return
        }
    }

    callUpFrom(floor: Floor) {
        this.direction=Direction.UP
        this.nextFloorsUp.push(floor)
        this.nextFloorsUp=this.nextFloorsUp.sort((a, b) => b-a);
    }

    callDownFrom(floor: Floor) {
        this.direction=Direction.DOWN
        this.nextFloorsDown.push(floor)
        this.nextFloorsDown=this.nextFloorsDown.sort((a, b) => a-b);
    }
}

enum Floor {
    GROUND,
    FIRST,
    SECOND,
    THIRD,
}

describe('test Lift Kata', () => {
    it('should be at ground level on initial state', () => {
        const elevator = new Elevator();
        expect(elevator.floor).toEqual(Floor.GROUND)

    });
    it('should be at given floor if given in initial state', () => {
        const elevator = new Elevator(Floor.SECOND);
        expect(elevator.floor).toEqual(Floor.SECOND)
    });
    it('should move to Ground Floor when elevator is empty and nobody is waiting', () => {
        const elevator = new Elevator(Floor.FIRST);
        expect(elevator.floor).toEqual(Floor.FIRST)
        elevator.go()
        expect(elevator.floor).toEqual(Floor.GROUND)
    });
    it('should go to the requested Floor if called', () => {
        const elevator = new Elevator();
        elevator.callUpFrom(Floor.THIRD)
        elevator.go()
        expect(elevator.floor).toEqual(Floor.THIRD)
    });
    it('should go throw several floors in the right order direction up', () => {
        const elevator = new Elevator();
        elevator.callUpFrom(Floor.THIRD)
        elevator.callUpFrom(Floor.FIRST)
        elevator.callUpFrom(Floor.SECOND)
        elevator.go()
        expect(elevator.floor).toEqual(Floor.FIRST)
    });
    it('should go throw several floors in the right order direction down', () => {
        const elevator = new Elevator();
        elevator.callDownFrom(Floor.SECOND)
        elevator.callDownFrom(Floor.THIRD)
        elevator.callDownFrom(Floor.FIRST)
        elevator.go()
        expect(elevator.floor).toEqual(Floor.THIRD)
    });
    it('should skip floors called for the opposite direction', () => {
        const elevator = new Elevator();
        elevator.callUpFrom(Floor.THIRD)
        elevator.callDownFrom(Floor.FIRST)
        elevator.callUpFrom(Floor.SECOND)
        elevator.go()
        expect(elevator.floor).toEqual(Floor.SECOND)
    });
    it('should keep direction until order stacks are empty', () => {
        const elevator = new Elevator();
        elevator.callDownFrom(Floor.THIRD)
        elevator.callDownFrom(Floor.FIRST)
        elevator.go()
        elevator.callUpFrom(Floor.SECOND)
        elevator.go()
        expect(elevator.floor).toEqual(Floor.FIRST)
    });
});
