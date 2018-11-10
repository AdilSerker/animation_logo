import { RotationParams, Edge } from "./types";

export const getRotationParams = (id: number, end: number): RotationParams => {
    if (id < 16) {
        if (id % 2) {
            return isOddId(id, end);
        }
        if (!(id%2)) {
            return isEvenId(id, end);
        }
    }

    return <RotationParams>{};
}

const isOddId = (id: number, end: number): RotationParams => {
    if (((id > 0 && id < 8 || id > 32 && id < 36) && end > 16 && end < 24) ||
        (id > 8 && id < 16 && end > 1 && end < 9)) {
        return {
            axis: id > 32 && id < 36 ? 'z' : 'y',
            angle: -3*Math.PI/2,
            edge: Edge.edgeL
        }
    }
    if ((id === 1 && end === 2) || (id === 7 && end === 8) ||
        (id === 9 && end === 10) || (id === 15 && end === 16)) {
        return {
            axis: 'y',
            angle: Math.PI,
            edge: Edge.edgeR
        }
    }
    if ((id === 3 && end === 11) || (id === 5 && end === 13)) {
        return {
            axis: 'y',
            angle: 3*Math.PI/2,
            edge: Edge.edgeR
        }
    }
    if ((id === 11 && end === 4) || (id === 13 && end === 6)) {
        return {
            axis: 'y',
            angle: Math.PI/2,
            edge: Edge.edgeR
        }
    }
    if (((id < 8 && id > 10) || id < 14 || id === 35) && id - 2 === end) {
        return {
            axis: id < 10 ? 'x' : 'z',
            angle: Math.PI,
            edge: Edge.edgeF
        }
    }
    if (((id < 8 && id > 10) || id < 14 || id === 33) && id + 2 === end) {
        return {
            axis: id < 10 ? 'x' : 'z',
            angle: id < 10 ? Math.PI : -Math.PI,
            edge: Edge.edgeB
        }
    }
    
    if (id === 7 && end === 39 || id === 15 && end === 40 || id === 9 && end === 41) {
        return {
            axis: end === 39 ? 'x' : 'z',
            angle: id === 7 ? 3*Math.PI/2 : -3*Math.PI/2,
            edge: Edge.edgeB
        };
    }

    if (id === 1 && end === 35 ||
        id === 9 && end === 36 ||
        id === 15 && end === 42 ||
        id === 33 && end === 27) {
        return {
            axis: end % 2 ? 'x' : 'z',
            angle: -3*Math.PI/2,
            edge: Edge.edgeF
        };
    }


    return <RotationParams>{};
}

const isEvenId = (id: number, end: number): RotationParams => {
    if (end > 25 && end < 33 && end % 2) {
        return {
            axis: 'y',
            angle: 3*Math.PI/2,
            edge: Edge.edgeR
        }
    }
    if (end === 9 || end === 12 || end === 14 || end === 15) {
        return {
            axis: 'y',
            angle: -3*Math.PI/2,
            edge: Edge.edgeL
        }
    }

    if (id + 2 === end) {
        return {
            axis: 'x',
            angle: Math.PI,
            edge: Edge.edgeB
        }
    }

    if (end === 39 || end === 40) {
        return {
            axis: 'x',
            angle: 3*Math.PI/2,
            edge: Edge.edgeB
        }
    }

    if (id - 2 === end) {
        return {
            axis: 'x',
            angle: Math.PI,
            edge: Edge.edgeF
        }
    }

    if (end === 35 || end === 36) {
        return {
            axis: 'x',
            angle: 3*Math.PI/2,
            edge: Edge.edgeF
        }
    }

    return <RotationParams>{};
}

// const getParams = (axis: string, angle: number, edge: Edge): RotationParams => {
//     return { axis, angle, edge };
// }