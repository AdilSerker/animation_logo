import { EventEmitter } from 'events';
import { Plane } from './Plane/Plane';

import { Group, Scene } from 'three';

const ID = 35;
const END = 17;

function randomInteger(min: number, max: number) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

export class AnimationFrame {
    public event: EventEmitter;

    protected group: Group;
    protected squares: Plane[];
    
    public constructor(scene: Scene) {
        this.event = new EventEmitter();
        this.event.on('turned', this.addPlane.bind(this));
        this.squares = [];
        this.group = new Group();
        
        scene.add(this.group);
    }

    public update(time: number): void {
        if (!this.squares.length) {          
            const plane = new Plane({
                id: ID,
                square: ID,
                isFirst: true 
            }, this.event);
            this.squares.push(plane);
            this.group.add(plane.square);
        }
        this.squares.forEach(item => {
            item.turn(time);
        });
    }

    protected addPlane(planeId: number, variableIds: number[]): void {
        const filteredIds = variableIds.filter(item => !this.squares.find(s => s.id === item));
        const endPoint = filteredIds[randomInteger(0, filteredIds.length)];
        const plane = new Plane({
            id: END,
            square: ID
        }, this.event);
        console.log(endPoint);
        
        this.squares.push(plane);
        this.group.add(plane.square);
    }

}

