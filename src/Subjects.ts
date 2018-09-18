import {
    Axis,
    Plane
} from './Plane';

import {
    Group,
    Scene
} from 'three';

export class Subjects {
    protected scene: Scene;
    
    protected group: Group;
    protected squares: Plane[];

    public constructor(scene: Scene) {
        this.squares = [];
        
        this.group = new Group()

        scene.add(this.group);
    }

    public update(delta: number): void {
        if (!this.squares.length) {
            this.addPLane(new Plane({ axis: Axis.X, spin: false }))
        }
        this.squares.forEach(item => {
            item.turn(delta);
        });
    }

    protected addPLane(plane: Plane): void {
        this.squares.push(plane);
        this.group.add(plane.mesh);
    }

}