import {
    DoubleSide,
    Group,
    Mesh,
    MeshPhysicalMaterial,
    PlaneGeometry,
} from 'three';
// import { IPlaneParams } from './types';

const levelTwo = [1, 2, 9, 10, 17, 18, 25, 26];
const levelOne = [3, 4, 11, 12, 19, 20, 27, 28];
const levelOneMin = [5, 6, 13, 14, 21, 22, 29, 30];
const levelTwoMin = [7, 8, 15, 16, 23, 24, 31, 32];

const GREEN_MATERIAL = {
    clearCoat: 0,
    color: 0x519b0b,
    metalness: 0,
    reflectivity: 0,
    roughness: 1,
    side: DoubleSide
};

let ids: number[] = [];

for (let i = 1; i < 43; ++i) {
    ids.push(i);
}

export const getSquareById = (id?: number): Group => {
    if (!id) {
        const rand = Math.floor(1 + Math.random() * (ids.length + 1 - 1));
        id = ids[rand];
        ids = ids.filter(item => item !== id);
    }

    let x: number;
    let z: number;
    const y = getY(id);

    const geometry = new PlaneGeometry(10, 10);
    const material = new MeshPhysicalMaterial(GREEN_MATERIAL);
    const mesh = new Mesh(geometry, material);
    const F = new Group();
    const R = new Group();
    const B = new Group();
    const L = new Group();
    F.add(mesh);
    R.add(F);
    B.add(R);
    L.add(B);

    if (id < 9 || (id > 24 && id < 33)) {
        x = id % 2 ? -5 : 5;
        z = id === 4 || id === 6 ? 0 : (id < 9) ? 10 : -10;
        L.position.set(id % 2 ? -10 : 0, y, z);
        B.position.set(5, -5, 0);
        R.position.set(5, 5, 0);
        F.position.set(-5, 5, 0);
        mesh.position.set(0, -5, 0);        
    }

    if (id > 8  && id < 33) {
        mesh.rotateY(Math.PI / 2);
        x = id === 11 || id === 13 ? 0 : (id < 17) ? 10 : -10;
        z = id % 2 ? 5 : -5;
        L.position.set(x, y, id % 2 ? 10 : 0);
        B.position.set(0, -5, -5);
        R.position.set(0, 5, -5);
        F.position.set(0, 5, 5);
        mesh.position.set(0, -5, 0);  
    }

    if (id > 32 && id < 41) {
        mesh.rotateX(Math.PI / 2);
        x = id % 2 ? 5 : -5;
        z = (id > 34 && id < 37) || (id > 38) ? 5 : -5;
        L.position.set(id % 2 ? -10 : 0, y, z);
        B.position.set(5, 0, 5);
        R.position.set(5,0, -5);
        F.position.set(-5, 0, -5);
        mesh.position.set(0, 0, 5);
    }

    if (id > 40) {
        mesh.rotateX(Math.PI / 2);
        L.position.set(0, y, 5)
        B.position.set(5, 0, 5);
        R.position.set(5,0, -5);
        F.position.set(-5, 0, -5);
        mesh.position.set(0, 0, 5);
    }
    return L;
}

const getY = (id: number): number => {
    if (levelOne.includes(id)) {
        return 5;
    }

    if (levelOneMin.includes(id)) {
        return -5;
    }
    
    if (levelTwo.includes(id)) {
        return 15;
    }

    if (levelTwoMin.includes(id)) {
        return -15;
    }

    if (id < 37 && id > 32) {
        return 20;
    }

    if (id > 36 && id < 41) {
        return -20;
    }

    return id > 41 ? -10 : 10;
}