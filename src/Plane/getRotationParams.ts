import { RotationParams, Edge } from "./types";

const LEVEL = 0;
const INDEX = 1;

export const getRotationParams = (id: number[], end: number[]): RotationParams => {

    if (id[LEVEL] === end[LEVEL]) {
        return equalLevel(id, end);
    }
    if ((id[LEVEL] === 0 && end[LEVEL] === 1) || (id[LEVEL] === 1 && end[LEVEL] === 0)) {
        return zeroLevelUp(id, end);
    }
    if (end[LEVEL] === 1.5) {
        if (id[LEVEL] > 1.5) {
            return {
                axis: id[INDEX]%2 ? 'z' : 'x',
                angle: id[INDEX]%2 ? Math.PI/2 : -Math.PI/2,
                edge: Edge.edgeF
            }
        } else {
            return {
                axis: id[INDEX]%2 ? 'z' : 'x',
                angle: id[INDEX]%2 ? -3*Math.PI/2 : 3*Math.PI/2,
                edge: Edge.edgeB
            }
        }
    }
    if (id[LEVEL] === 1.5) {
        return {
            axis: end[INDEX]%2 ? 'z' : 'x',
            angle: end[LEVEL] > id[LEVEL] ? 
                (end[INDEX]%2 ? -Math.PI/2 : Math.PI/2) :
                (end[INDEX]%2 ? 3*Math.PI/2 : -3*Math.PI/2),
            edge: end[LEVEL] < id[LEVEL] ?
                (end[INDEX]%2 ? Edge.edgeR : Edge.edgeB) :
                (end[INDEX]%2 ? Edge.edgeL : Edge.edgeF)
        }
    }
    if (id[INDEX] === end[INDEX]) {
        
        return {
            axis: id[INDEX] < 3 ? 'x' : 'z',
            angle: id[LEVEL] < end[LEVEL] ? 
                (id[INDEX] < 3 ? Math.PI : -Math.PI) :
                (id[INDEX] < 3 ? -Math.PI : Math.PI),
            edge: id[LEVEL] < end[LEVEL] ? Edge.edgeB : Edge.edgeF
        }
    }

    if (id[LEVEL] === 3.5) {
        return firstRotation(id, end);
        
    }

    return <RotationParams>{};
}

const equalLevel = (id: number[], end: number[]): RotationParams => {
    if ((id[LEVEL] === 2 || id[LEVEL] === 3) &&
    Math.abs(end[INDEX] - id[INDEX]) === 1) {
        return {
            axis: 'y',
            angle: id[INDEX] < end[INDEX] ? -Math.PI/2 : Math.PI/2,
            edge: id[INDEX] > end[INDEX] ? Edge.edgeR : Edge.edgeL
        }
    }
    if (id[LEVEL] === 0) {
        return zeroLevelRotation(id, end);
    }
    return {
        axis: 'y',
        angle: (Math.abs(end[INDEX] - id[INDEX]) > 1 || 
                (id[INDEX] === 2 && end[INDEX] === 3) ||
                (id[INDEX] === 3 && end[INDEX] === 2)) ? 
            (id[INDEX] > end[INDEX] ? -3*Math.PI/2 : 3*Math.PI/2) :
            (id[INDEX] > end[INDEX] ? -Math.PI : Math.PI),
        edge: id[INDEX] < end[INDEX] ? Edge.edgeR : Edge.edgeL
    }
}

const zeroLevelRotation = (id: number[], end: number[]): RotationParams => {
    return {
        axis: Math.abs(id[INDEX] - end[INDEX]) > 1 ? 'x' : 'z',
        angle: id[INDEX] - end[INDEX] > 0 ? Math.PI : -Math.PI, 
        edge: Math.abs(id[INDEX] - end[INDEX]) > 1 ?
            (id[INDEX] - end[INDEX] > 0 ? Edge.edgeB : Edge.edgeF) :
            (id[INDEX] - end[INDEX] > 0 ? Edge.edgeL : Edge.edgeR)
    }
}

const firstRotation = (id: number[], end: number[]): RotationParams => {
    return {
        axis: end[INDEX] > 2 ? 'z' : 'x',
        angle: id[LEVEL] > end[LEVEL]
            ? ((end[INDEX] > 2) ? Math.PI/2 : -Math.PI/2)
            : ((end[INDEX] > 2) ? -3*Math.PI/2 : 3*Math.PI/2),
        edge: id[LEVEL] > end[LEVEL] && end[INDEX] === 2
            ? Edge.edgeF
            : id[LEVEL] > end[LEVEL] && end[INDEX] === 3 
                ? Edge.edgeL
                : id[LEVEL] < end[LEVEL] && end[INDEX] === 2
                    ? Edge.edgeB
                    : Edge.edgeR
    }
}

const zeroLevelUp = (id: number[], end: number[]): RotationParams => {
    if (id[LEVEL] < end[LEVEL]) {
        return {
            axis: end[INDEX] < 3 ? 'x' : 'z',
            angle: end[INDEX] < 3 ? 3*Math.PI/2 : -3*Math.PI/2,
            edge: end[INDEX] < 3 ? Edge.edgeB : Edge.edgeR
        }
    } else {
        return {
            axis: id[INDEX] < 3 ? 'x' : 'z',
            angle: id[INDEX] < 3 ? -3*Math.PI/2 : 3*Math.PI/2,
            edge: Edge.edgeF
        }
    }

    return <RotationParams>{};
}

window['getRotationParams'] = getRotationParams;