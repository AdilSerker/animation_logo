import { EventEmitter } from 'events';
import {
    Axis,
    Plane
} from './Plane';

import {
    Group,
    Scene
} from 'three';


export class Subjects {
    public event: EventEmitter;

    protected scene: Scene;
    
    protected group: Group;
    protected squares: Plane[];

    public constructor(scene: Scene) {
        this.event = new EventEmitter();
        this.event.on('addPlane', this.addPlane.bind(this));
        this.squares = [];
        this.group = new Group()
        
        scene.add(this.group);
    }

    public update(delta: number): void {
        if (!this.squares.length) {
            this.addPlane(new Plane({ axis: Axis.X, spin: false, isFirst: true }, this.event))
        }
        this.squares.forEach(item => {
            item.turn(delta);
        });
    }

    public addPlane(plane: Plane): void {
        if (this.squares.length < 2) {
            this.squares.push(plane);
            this.group.add(plane.mesh);
        }
    }

}