import { EventEmitter } from 'events';
import {
    // Mesh, 
    Group, Object3D, 
    // Vector3, 
    // Matrix4,
    // Quaternion, 
} from "three";
import { getSquareById } from './getMeshById';
import { Axis, IPlaneParams, PlaneType } from './types';

export class Plane {
    public isTurned: boolean;
    public square: Group;

    protected isFirst: boolean;
    protected event: EventEmitter;
    protected duration: number;
    protected t0: number;

    protected edgeF: Object3D;
    protected edgeL: Object3D;
    protected edgeR: Object3D;
    protected edgeB: Object3D;
    
    public constructor({
            square,
            isFirst = false,
        }: IPlaneParams,
        event: EventEmitter
    ) {
        this.square = square;

        this.edgeL = square;
        this.edgeB = square.children[0];
        this.edgeR = this.edgeB.children[0];
        this.edgeF = this.edgeR.children[0];

        this.duration = 2000;
        this.isFirst = isFirst;
        this.event = event;
    
    }

    public turn(time: number): void {
        this.t0 = this.t0 || time;
        const timeFraction = (time - this.t0) / this.duration;
        if (timeFraction > 1 && !this.isTurned) {
            this.event.emit('turned', new Plane({
                square: getSquareById(6)
            }, this.event));
            this.isTurned = true;
        }
        if (this.isFirst) {
            return;
        }
        this.edgeB.rotation['x'] = Math.PI/2 * (1 - this.easeOutExpo(timeFraction));
        
    }

    protected easeOutExpo(pos: number) {
        return (pos===1) ? 1 : -Math.pow(2, -10 * pos) + 1;
    }

    protected randomAxis(planeType: PlaneType): Axis {
        const MIN = 1;
        const MAX = 3;
        let rand: number;
        if (planeType === PlaneType.XY) {
            rand = Math.floor(MIN + Math.random() * (MAX + 1 - MIN));
            return rand === 1 ? Axis.X : Axis.Z;
        }
        if (planeType === PlaneType.YZ) {
            rand = Math.floor(MIN + Math.random() * (MAX + 1 - MIN));
            return rand === 1 ? Axis.Z : Axis.Y;
        }

        rand = Math.floor(MIN + Math.random() * (MAX + 1 - MIN));
        return rand === 1 ? Axis.X : Axis.Y;
    }
}
