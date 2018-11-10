import { EventEmitter } from 'events';
import { Plane } from './Plane/Plane';
// import { Axis, PlaneType } from './Plane/types';

import { Group, Scene } from 'three';
import { getSquareById } from './Plane/getMeshById';

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
            // const m1 = getSquareById(42);
            // const m2 = getMeshById(10);
            const m3 = getSquareById(42);
            // const plane = new Plane({ square: m1 }, this.event);
            // const plane2 = new Plane({ mesh: m2, isFirst: true }, this.event);
            const plane3 = new Plane({ square: m3, isFirst: true }, this.event);
            this.addPlane(plane3);
            // this.addPlane(plane2);
            // this.addPlane(plane3);
        }
        this.squares.forEach(item => {
            // tslint:disable-next-line:no-unused-expression
            item.turn(time);
        });
    }

    protected addPlane(plane: Plane): void {
        if (this.squares.length > 1) {
            return;
        }
        this.squares.push(plane);
        this.group.add(plane.square);
    }

}