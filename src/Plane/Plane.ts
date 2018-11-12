import { EventEmitter } from 'events';
import { Group, Mesh, MeshPhysicalMaterial, Object3D } from "three";

import { IPlaneParams, RotationParams } from './types';
import { getSquareById } from './getMeshById';
import { getRotationParams } from './getRotationParams';
import { variableIds } from './indexId';
// import { randomInteger } from 'src/utils/randomInteger';

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

    protected mesh: Mesh;
    protected material: MeshPhysicalMaterial;

    protected rotationParams: RotationParams;
    protected emmitable: boolean;
    
    public constructor({
            id,
            square,
            isFirst = false,
            emmitable = false,
            duration = 135
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

        this.mesh = this.edgeF.children[0] as Mesh;
        this.material = this.mesh.material as MeshPhysicalMaterial;

        this.duration = !isFirst ?
            duration : 
            2000;
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
            // this.material.transparent = false;
            // this.material.opacity = 1;
            if (this.emmitable) this.event.emit('turned', this.id, variableIds(this.id));
            this.isTurned = true;
            return;
        }
        if (this.isFirst) {
            return;
            // this.material.transparent = true;
            // this.material.opacity = this.coswave(timeFraction);
        } else {
            const { axis, angle, edge } = this.rotationParams;
            this[edge].rotation[axis] = angle * this.easeOutExpo(timeFraction);
        }
    }

    protected easeOutExpo(pos: number) {
        return (pos===1) ? 1 : -Math.pow(2, -10 * pos) + 1;
    }

    protected coswave(time: number) {
        return (Math.cos(11 * time - 3.2) + 1)/2;
    }

}

// (cos(11x-3.2)+1)/2;
