import { 
    // Mesh,
    Group, 
    Vector2,
} from "three";

export enum Axis {
    X = 'x',
    Y = 'y',
    Z = 'z'
}

export enum Route {
    F = 'F',
    L = 'L',
    R = 'R',
    B = 'B'
}

export enum PlaneType {
    XY = 'xy',
    XZ = 'xz',
    YZ = 'zy'
}

export interface IPlaneParams {
    square: Group
    isFirst?: boolean
}

export interface IMeshParams {
    planeType: PlaneType;
    depth: number;
    position: Vector2;
    axis?: Axis;
    simmetry?: boolean;
}