import { EventEmitter } from 'events';
import {
    DoubleSide,
    Mesh,
    MeshPhysicalMaterial,
    PlaneGeometry,
    Vector3,
} from "three";

const GREEN_MATERIAL = {
    clearCoat: 0,
    color: 0x519b0b,
    metalness: 0,
    reflectivity: 0,
    roughness: 1,
    side: DoubleSide
};

export enum Axis {
    X = 'x',
    Y = 'y',
    Z = 'z'
}

interface IPlaneParams {
    mesh?: Mesh;
    axis?: Axis;
    spin?: boolean;
    speed?: number;
    position?: Vector3;
    isFirst?: boolean
}


export class Plane {
    public isTurned: boolean;

    public mesh: Mesh;

    protected axis: Axis;
    protected spin: boolean;
    protected speed: number;
    protected angle: number;

    protected isFirst: boolean;

    protected t0: number;
    protected duration: number;

    protected position: Vector3;

    protected event: EventEmitter;

    public constructor({
            mesh,
            axis,
            spin = false,
            speed = 1,
            position,
            isFirst = false
        }: IPlaneParams,
        event: EventEmitter
    ) {
        this.mesh = mesh && mesh.clone() || this.getMesh();
        this.axis = axis || this.randomAxis();
        this.spin = spin;
        this.speed = speed;
        this.duration = speed * 100 + 1000;
        if (isFirst) {
            this.isFirst = isFirst;
            this.mesh.rotation[this.axis] = Math.PI / 2;
        }
        this.event = event;
    }

    public turn(delta: number): void {
        if (!this.t0) {
            this.t0 = Date.now();
        }
        let timeFraction = (Date.now() - this.t0) / this.duration;
        if (timeFraction > 1) {
            timeFraction = 1;
            this.isTurned = true;
            
        }
        if (this.isFirst) {
    
            if (this.isTurned) {
                this.event.emit('addPlane', new Plane({ mesh: this.mesh, axis: Axis.X }, this.event));
            }
        } else {
            this.mesh.rotation[this.axis] = Math.PI / 2 + Math.PI * this.circ(timeFraction) * this.getSpin();
            if (this.isTurned) {
                this.event.emit('addPlane', new Plane({ mesh: this.mesh }, this.event));
            }
        }
    }

    protected circ(timeFraction: number) { return timeFraction*(2-timeFraction) }

    protected getSpin(): number {
        return (this.spin) ? 1 : -1;
    }


    protected randomAxis(): Axis {
        const MIN = 1;
        const MAX = 4;
        const rand = Math.floor(MIN + Math.random() * (MAX + 1 - MIN));
        return rand === 1 ? Axis.X :
            (rand === 2) ? Axis.Y : Axis.Z
    }

    protected getMesh(): Mesh {
        const geometry = new PlaneGeometry(10, 10);
        geometry.translate(5, 5, 0);
        const material = new MeshPhysicalMaterial(GREEN_MATERIAL);
        const mesh = new Mesh(geometry, material);

        mesh.position.set(0, 0, 0);

        return mesh;
    }
}