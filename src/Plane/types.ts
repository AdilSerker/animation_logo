import { Vector2 } from "three";

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

export interface IPlaneParams {
    planeType: PlaneType;
    depth: number;
    position: Vector2;
    pi?: boolean;
    axis?: Axis;
    simmetry?: boolean;
    spin?: boolean;
    isFirst?: boolean
}

export interface IMeshParams {
    planeType: PlaneType;
    depth: number;
    position: Vector2;
    axis?: Axis;
    simmetry?: boolean;
}