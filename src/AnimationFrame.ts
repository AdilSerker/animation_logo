import { EventEmitter } from 'events';
import { Plane } from './Plane/Plane';
// import { Axis, PlaneType } from './Plane/types';

import { Group, Scene } from 'three';
import { getSquareById } from './Plane/getMeshById';

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
                id: 42,
                square: getSquareById(42),
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
            id: endPoint,
            square: getSquareById(planeId)
        }, this.event);
        console.log(endPoint);
        
        this.squares.push(plane);
        this.group.add(plane.square);
    }

}

