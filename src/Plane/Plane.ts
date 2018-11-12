import { EventEmitter } from 'events';
import {
    // Mesh, 
    Group, Object3D, 
    // Vector3, 
    // Matrix4,
    // Quaternion, 
} from "three";
// import { getSquareById } from './getMeshById';

import { IPlaneParams, RotationParams } from './types';
import { getSquareById } from './getMeshById';
import { getRotationParams } from './getRotationParams';
import { variableIds } from './indexId';

// function randomInteger(min: number, max: number) {
//     var rand = min - 0.5 + Math.random() * (max - min + 1)
//     rand = Math.round(rand);
//     return rand;
// }
export class Plane {
    public static count: number = 0;

    public id: number[];
    public square: Group;
    
    protected squareId: number[];
    protected isTurned: boolean;
    protected isFirst: boolean;
    protected event: EventEmitter;
    protected duration: number;
    protected t0: number;

    protected edgeF: Object3D;
    protected edgeL: Object3D;
    protected edgeR: Object3D;
    protected edgeB: Object3D;

    protected rotationParams: RotationParams;
    protected emmitable: boolean;
    
    public constructor({
            id,
            square,
            isFirst = false,
            emmitable = false,
            duration = 150
        }: IPlaneParams,
        event: EventEmitter
    ) {
        this.id = id;
        this.squareId = square;
        this.square = getSquareById(square);
        this.rotationParams = getRotationParams(square, id);
        this.edgeL = this.square;
        this.edgeB = this.square.children[0];
        this.edgeR = this.edgeB.children[0];
        this.edgeF = this.edgeR.children[0];

        this.duration = !isFirst ?
            duration : 
            1000;
        this.isFirst = isFirst;
        this.event = event;

        this.emmitable = emmitable;
    }

    public turn(time: number): void {
        if (this.isTurned) {
            return;
        }
        this.t0 = this.t0 || time;
        const timeFraction = (time - this.t0) / this.duration;
        if (timeFraction > 1) {

            if (this.emmitable) this.event.emit('turned', this.id, variableIds(this.id));
            this.isTurned = true;
        }
        if (this.isFirst) {
            return;
        }

        const { axis, angle, edge } = this.rotationParams;
        this[edge].rotation[axis] = angle * this.easeOutExpo(timeFraction);
        
    }

    protected easeOutExpo(pos: number) {
        return (pos===1) ? 1 : -Math.pow(2, -10 * pos) + 1;
    }

}
