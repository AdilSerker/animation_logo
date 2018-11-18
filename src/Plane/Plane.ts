import { EventEmitter } from 'events';
import { Group, Mesh, MeshPhysicalMaterial, Object3D } from "three";

import { IPlaneParams, RotationParams } from './types';
import { getSquareById } from './getMeshById';
import { getRotationParams } from './getRotationParams';
// import { variableIds } from './indexId';
// import { randomInteger } from 'src/utils/randomInteger';

export class Plane {
    public static count: number = 0;

    public id: number[];
    public square: Group;
    public isTurned: boolean;
    
    protected squareId: number[];
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
            duration
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

        this.duration = duration;
        this.isFirst = isFirst;
        this.event = event;

        this.emmitable = emmitable;

    }

    public turn(time: number): void {
        if (!this.t0) {
            this.t0 = time;
        }
        if (this.isTurned) {
            return;
        }

        const timeFraction = time - this.t0;
        if (this.isFirst) {
            this.material.transparent = true;
            this.material.opacity = this.coswave(timeFraction);
            if(timeFraction > 2000) {
                this.isTurned = true;
                this.event.emit('turned', this.id, this.duration);
                this.material.opacity = 1;
            }

        } else {
            const { axis, angle, edge } = this.rotationParams;

            let currentAngle: number;
            this[edge].rotation[axis] = currentAngle = this.easeOutExpo(timeFraction, 0, angle, this.duration);

            if (Math.abs(currentAngle) > Math.abs(Number(angle.toFixed(2)))) {
                this.emmitable && this.event.emit('turned', this.id, this.duration);
                this.material.opacity = 1;
                this.isTurned = true;
            }
        }

    }

    protected coswave(time: number) {
        return (Math.cos(time/50) + 1)/2;
    }

    protected easeOutExpo(t: number, b: number, c: number, d: number) {
        return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
    }

}
