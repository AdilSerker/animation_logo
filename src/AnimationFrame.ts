import { EventEmitter } from 'events';
import { Plane } from './Plane/Plane';
// import { Axis, PlaneType } from './Plane/types';

import { Group, Scene } from 'three';
import { getParamsById } from './Plane/getParamsById';

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
                ...getParamsById(42),
                isFirst: true
            }, this.event));
        }
        this.squares.forEach(item => {
            // tslint:disable-next-line:no-unused-expression
            item.turn(time);
        });
    }

    protected addPlane(plane?: Plane): void {

        if (this.squares.length > 50) {
            return;
        }
        const planes: Plane[] = plane ? [plane] : [];
        this.squares.push(...planes);
        planes.forEach(item => this.group.add(item.mesh));
    }

}