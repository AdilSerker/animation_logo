export const variableIds = (id: number[]): number[][] => {
    let ids: number[][] = [];

    if (id[0] === 0) {
        if(id[1] === 1) return [[0,2], [0,3], [1,1]];
        if(id[1] === 2) return [[0,1], [0,4], [1,2], [1,3]];
        if(id[1] === 3) return [[0,1], [0,4]];
        if(id[1] === 4) return [[0,2], [0,3], [1,4]];
    }
    if (id[0] === 3.5){
        return [[3, 2], [4, 2], [3, 3], [4, 3]];
    }
    if (id[0] === 1.5) {
        return [[1, 2], [2, 2], [1, 3], [2, 3]];
    }
    if (id[0] === 1 && (id[1] === 2 || id[1] === 3)) {
        return [
            [0,2],
            id[1] === 2 ? [1,1] : [1,2],
            id[1] === 2 ? [1,3] : [1,4],
            [1.5, 0]
        ];
    }

    if (id[0] === 4 && (id[1] === 2 || id[1] === 3)) {
        return [
            id[1] === 2 ? [4,1] : [4,2],
            id[1] === 2 ? [4,3] : [4,4],
            [3.5, 0]
        ];
    }

    if ((id[1] === 2 || id[1] === 3) && id[0] === 2) {
        return [
            [1.5, 0],
            [id[0] + 1, id[1]],
            (id[1] === 2) ?
                [id[0], id[1] + 1] :
                [id[0], id[1] - 2],
            (id[1] === 2) ?
                [id[0], id[1] + 2] :
                [id[0], id[1] - 1],
        ];
    }

    if ((id[1] === 2 || id[1] === 3) && id[0] === 3) {
        return [
            [id[0] - 1, id[1]],
            (id[1] === 2) ?
                [id[0], id[1] + 1] :
                [id[0], id[1] - 2],
            (id[1] === 2) ?
                [id[0], id[1] + 2] :
                [id[0], id[1] - 1],
        ];
    }

    if (id[0] > 0 && id[0] < 5) {
        ids = [
            ((id[0] === 2 || id[0] === 3) && id[1] === 4) ?
                [id[0], id[1] - 2] :
                [id[0], id[1] - 1],
            ((id[0] === 2 || id[0] === 3) && id[1] === 1) ?
                [id[0], id[1] + 2] :
                [id[0], id[1] + 1],
            (id[0] === 2 && (id[1] === 2) || id[1] === 3) ?
                [1.5, 0] :
                [id[0] - 1, id[1]],
            (id[0] === 3 && (id[1] === 2) || id[1] === 3) ?
                [3.5, 0] :
                [id[0] + 1, id[1]]];
        return ids.filter(item => item[0] < 5 && item[1] > 0 && item[1] < 5);
    }

    return ids;
}

window['variableIds'] = variableIds;
