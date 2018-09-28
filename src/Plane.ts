import { EventEmitter } from 'events';
import {
    DoubleSide,
    Mesh,
    MeshPhysicalMaterial,
    PlaneGeometry,
    Vector2
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

export enum PlaneType {
    XY = 'xy',
    XZ = 'xz',
    YZ = 'zy'
}

interface IPlaneParams {
    planeType: PlaneType;
    depth: number;
    position: Vector2;
    pi?: boolean;
    axis?: Axis;
    simmetry?: boolean;
    spin?: boolean;
    isFirst?: boolean
}

interface IMeshParams {
    planeType: PlaneType;
    depth: number;
    position: Vector2;
    axis?: Axis;
    simmetry?: boolean;
}

export class Plane {
    public isTurned: boolean;
    public mesh: Mesh;

    protected planeType: PlaneType;
    protected depth: number;
    protected position: Vector2;
    protected axis: Axis;
    protected spin: number;
    protected pi: boolean;

    protected isFirst: boolean;
    protected simmetry: boolean;

    protected t0: number;
    protected duration: number;
    
    protected event: EventEmitter;
    
    protected timingFunction: boolean;

    protected params: IPlaneParams;
    
    public constructor({
            planeType,
            depth,
            position,
            axis,
            simmetry,
            spin,
            isFirst = false,
            pi
        }: IPlaneParams,
        event: EventEmitter
    ) {
        this.mesh = this.getMesh({ axis, planeType, depth, position, simmetry });
        this.axis = axis || this.randomAxis();
        this.spin = spin ? 1 : spin === false ? -1 : this.getRandomSpin();
        this.duration = 500;
        this.isFirst = isFirst;
        this.event = event;
        this.timingFunction = true;

        this.params = {
            axis,
            depth,
            pi,
            planeType,
            position,
            simmetry
        }
    }

    public turn(time: number): void {
        this.t0 = this.t0 || time;

        const timeFraction = (time - this.t0) / this.duration;
        if (timeFraction > 1) {
            if (!this.isTurned) {
                this.event.emit('turned');
                this.isTurned = true;
            }
        }
        if (!this.isFirst) {
            this.mesh.rotation[this.axis] = 
                (this.pi ? Math.PI : this.spin > 0 ? Math.PI / 2 : 3 * Math.PI / 2) *
                (this.timingFunction ? this.easeInExpo(timeFraction) : this.easeOutExpo(timeFraction));
        }
    }

    protected easeInExpo(pos: number) {
        return (pos===0) ? 0 : Math.pow(2, 10 * (pos - 1));
    }

    protected easeOutExpo(pos: number) {
        return (pos===1) ? 1 : -Math.pow(2, -10 * pos) + 1;
    }
        
    protected getRandomSpin(): number {
        return (Math.random() * 2 - 1) > 0 ? 1 : -1;
    }

    protected randomAxis(): Axis {
        const MIN = 1;
        const MAX = 4;
        const rand = Math.floor(MIN + Math.random() * (MAX + 1 - MIN));
        return rand === 1 ? Axis.X :
            (rand === 2) ? Axis.Y : Axis.Z
    }

    protected getMesh({ planeType, depth, position, simmetry, axis }: IMeshParams): Mesh {
        const geometry = new PlaneGeometry(10, 10);
        const material = new MeshPhysicalMaterial(GREEN_MATERIAL);
        const mesh = new Mesh(geometry, material);
        switch (planeType) {
            case PlaneType.XY:
                geometry.translate(
                    position.x * 5,
                    position.y * 5,
                    0
                );
                geometry.rotateX(Math.PI / 2);
                mesh.position.y = depth * 10;
                break;

            case PlaneType.YZ:
                geometry.translate(
                    position.x * 5,
                    (position.y > 0 ? 1 : -1) * 5,
                    0
                );
                geometry.rotateY(Math.PI / 2);
                mesh.position.x = depth * 10;
                if (Math.abs(position.y) > 1) {
                    mesh.position.y = (position.y > 0 ? 1 : -1) * 10;
                }
                break;

            case PlaneType.XZ:
                geometry.translate(
                    position.x * 5,
                    (position.y > 0 ? 1 : -1) * 5,
                    0
                );
                mesh.position.z = depth * 10;
                if (Math.abs(position.y) > 1) {
                    mesh.position.y = (position.y > 0 ? 1 : -1) * 10;
                }
                break;
            default:
                break;
        }
        
        return mesh;
    }
}