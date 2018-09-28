import { EventEmitter } from 'events';
import { Axis, Plane, PlaneType } from './Plane';

import { Group, Scene, Vector2 } from 'three';

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
            this.addPlane(new Plane({
                axis: Axis.Z,
                depth: -1,
                isFirst: true,
                planeType: PlaneType.XY,
                position: new Vector2(1, 1),
                simmetry: true,
                spin: true
            }, this.event));
        }
        this.squares.forEach(item => {
            // tslint:disable-next-line:no-unused-expression
            item.turn(time);
        });
    }

    protected addPlane(plane?: Plane): void {

        if (this.squares.length > 3) {
            return;
        }
        const planes: Plane[] = plane ? [plane] : [];
        this.squares.push(...planes);
        planes.forEach(item => this.group.add(item.mesh));
    }

}