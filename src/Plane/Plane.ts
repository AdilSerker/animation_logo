import { EventEmitter } from 'events';
import {
    // Mesh, 
    Group, Object3D, 
    // Vector3, 
    // Matrix4,
    // Quaternion, 
} from "three";
// import { getSquareById } from './getMeshById';
import { variableIds } from './indexId';
import { Axis, IPlaneParams, PlaneType } from './types';
import { getSquareById } from './getMeshById';
import { getRotationParams } from './getRotationParams';

export class Plane {
    public id: number;
    public square: Group;
    
    protected squareId: number;
    protected isTurned: boolean;
    protected isFirst: boolean;
    protected event: EventEmitter;
    protected duration: number;
    protected t0: number;

    protected edgeF: Object3D;
    protected edgeL: Object3D;
    protected edgeR: Object3D;
    protected edgeB: Object3D;
    
    public constructor({
            id,
            square,
            isFirst = false,
        }: IPlaneParams,
        event: EventEmitter
    ) {
        this.id = id;
        this.squareId = square;
        this.square = getSquareById(square);

        this.edgeL = this.square;
        this.edgeB = this.square.children[0];
        this.edgeR = this.edgeB.children[0];
        this.edgeF = this.edgeR.children[0];

        this.duration = 2000;
        this.isFirst = isFirst;
        this.event = event;
    
    }

    public turn(time: number): void {
        if (this.isTurned) {
            return;
        }
        this.t0 = this.t0 || time;
        const timeFraction = (time - this.t0) / this.duration;
        if (timeFraction > 1 && !this.isTurned) {
            this.event.emit('turned', this.id, variableIds[this.id]);
            this.isTurned = true;
        }
        if (this.isFirst) {
            return;
        }

        const { axis, angle, edge } = getRotationParams(this.squareId, this.id);
        this[edge].rotation[axis] = angle * this.easeOutExpo(timeFraction);
        
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
