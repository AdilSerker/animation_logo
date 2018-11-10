// import { Vector2 } from 'three';
// import { IPlaneParams, PlaneType } from './types';

// const levelTwo = [1, 2, 9, 10, 17, 18, 25, 26];
// const levelOne = [3, 4, 11, 12, 19, 20, 27, 28, 35, 36, 39, 40];
// const levelOneMin = [5, 6, 13, 14, 21, 22, 29, 30, 33, 34, 37, 38];
// const levelTwoMin = [7, 8, 15, 16, 23, 24, 31, 32];

// let ids: number[] = [];

// for (let i = 1; i < 43; ++i) {
//     ids.push(i);
// }

// export const getParamsById = (id?: number): IPlaneParams => {
//     if (!id) {
//         const rand = Math.floor(1 + Math.random() * (ids.length + 1 - 1));
//         id = ids[rand];
//         ids = ids.filter(item => item !== id);
//     }
//     const x = id % 2 ? -1 : 1;
//     const y = getY(id);
//     if (id < 9 || (id > 24 && id < 33)) {
//         return {
//             depth: id === 4 || id === 6 ? 0 : (id < 9) ? 1 : -1,
//             planeType: PlaneType.XY,
//             position: new Vector2(x, y)
//         }
//     }

//     if (id > 8  && id < 33) {
//         return {
//             depth: id === 11 || id === 13 ? 0 : (id < 17) ? 1 : -1,
//             planeType: PlaneType.YZ,
//             position: new Vector2(x, y)
//         }
//     }

//     if (id > 32 && id < 41) {
//         return {
//             depth: (id < 37) ? 2 : -2,
//             planeType: PlaneType.XZ,
//             position: new Vector2(x, y)
//         }
//     }

//     return {
//         depth: id === 42 ? -1 : 1,
//         planeType: PlaneType.XZ,
//         position: new Vector2(1, 1)
//     };
// }

// const getY = (id: number): number => {
//     if (levelOne.includes(id)) {
//         return 1;
//     }

//     if (levelOneMin.includes(id)) {
//         return -1;
//     }
    
//     if (levelTwo.includes(id)) {
//         return 2;
//     }

//     if (levelTwoMin.includes(id)) {
//         return -2;
//     }

//     return 0;
// }