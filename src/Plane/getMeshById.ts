import {
    DoubleSide,
    Group,
    Mesh,
    MeshPhysicalMaterial,
    PlaneGeometry,
} from 'three';

const GREEN_MATERIAL = {
    clearCoat: 0,
    color: 0x177744,
    metalness: 0,
    reflectivity: 0,
    roughness: 1,
    side: DoubleSide
};

let ids: number[] = [];

for (let i = 1; i < 43; ++i) {
    ids.push(i);
}

export const getSquareById = (id: number[]): Group => {

    let x: number;
    let z: number;
    const y = Level[id[0]];

    const geometry = new PlaneGeometry(10.2, 10.2);
    const material = new MeshPhysicalMaterial(GREEN_MATERIAL);
    const mesh = new Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const F = new Group();
    const R = new Group();
    const B = new Group();
    const L = new Group();
    F.add(mesh);
    R.add(F);
    B.add(R);
    L.add(B);

    if (id[0] > 0 && id[0] < 5 && id[1] > 0 && id[1] < 3) {
        x = id[1] % 2 ? -10 : 0;
        z = (id[0] === 2 || id[0] === 3) && id[1] === 2 ? 0 : 10;
        L.position.set(x, y, z);
        B.position.set(5, -5, 0);
        R.position.set(5, 5, 0);
        F.position.set(-5, 5, 0);
        mesh.position.set(0, -5, 0);   
             
    }

    if (id[0] > 0 && id[0] < 5 && id[1] > 2 && id[1] < 5) {
        mesh.rotateY(Math.PI / 2);
        x = (id[0] === 2 || id[0] === 3) && id[1] === 3 ? 0 : 10;
        z = id[1] % 2 ? 10 : 0;
        L.position.set(x, y, z);
        B.position.set(0, -5, -5);
        R.position.set(0, 5, -5);
        F.position.set(0, 5, 5);
        mesh.position.set(0, -5, 0);  
    }

    if (id[0] === 0) {
        mesh.rotateX(Math.PI / 2);
        x = id[1] % 2 ? -10 : 0;
        z = id[1] < 3 ? 5 : -5;
        L.position.set(x, y, z);
        B.position.set(5, 0, 5);
        R.position.set(5,0, -5);
        F.position.set(-5, 0, -5);
        mesh.position.set(0, 0, 5);
    }

    if (id[0] === 1.5 || id[0] === 3.5) {
        mesh.rotateX(Math.PI / 2);
        L.position.set(0, y, 5)
        B.position.set(5, 0, 5);
        R.position.set(5,0, -5);
        F.position.set(-5, 0, -5);
        mesh.position.set(0, 0, 5);
    }
    return L;
}

const Level = {
    0: 20,
    0.5: 20, 
    1: 15,
    1.5: 10,
    2: 5,
    3: -5,
    3.5: -10,
    4: -15,
    5: -20
}
