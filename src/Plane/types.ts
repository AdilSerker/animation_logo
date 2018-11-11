import { 
    // Mesh,
    // Group, 
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

export enum Edge {
    edgeL = 'edgeL',
    edgeB = 'edgeB',
    edgeR = 'edgeR',
    edgeF = 'edgeF'
}

export type RotationParams =  {
    axis: string,
    edge: Edge,
    angle: number
}

export enum PlaneType {
    XY = 'xy',
    XZ = 'xz',
    YZ = 'zy'
}

export interface IPlaneParams {
    id: number[];
    square: number[];
    isFirst?: boolean
}

export interface IMeshParams {
    planeType: PlaneType;
    depth: number;
    position: Vector2;
    axis?: Axis;
    simmetry?: boolean;
}