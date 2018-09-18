import {
    DoubleSide,
    Euler,
    Mesh,
    MeshPhysicalMaterial,
    PlaneGeometry,
    // Quaternion,
    Vector3,
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

interface IPlaneParams {
    mesh?: Mesh;
    axis?: Axis;
    spin?: boolean;
    speed?: number;
    position?: Vector3;
}


export class Plane {
    public isTurned: boolean;

    public mesh: Mesh;

    protected axis: Axis;
    protected spin: boolean;
    protected speed: number;
    protected angle: number;

    protected position: Vector3;

    public constructor({ mesh, axis, spin = true, speed = 1, position }: IPlaneParams) {
        this.mesh = mesh && mesh.clone() || this.getMesh();
        this.axis = axis || this.randomAxis();
        this.spin = spin;
        this.speed = speed;
    }

    public turn(delta: number): void {
        if (!delta) {
            const euler = new Euler();

            console.log(euler);
        }
        const spin = (this.spin) ? 1 : -1;
        this.mesh.rotateOnAxis(new Vector3(1,0,0), this.speed * delta * spin * Math.PI / 2);
        // console.log(this.mesh.rotation);
    }

    protected randomAxis(): Axis {
        const MIN = 1;
        const MAX = 4;
        const rand = Math.floor(MIN + Math.random() * (MAX + 1 - MIN));
        return rand === 1 ? Axis.X :
            (rand === 2) ? Axis.Y : Axis.Z
    }

    protected getMesh(): Mesh {
        const geometry = new PlaneGeometry(10, 10);
        geometry.translate(5, 5, 0);
        const material = new MeshPhysicalMaterial(GREEN_MATERIAL);
        const mesh = new Mesh(geometry, material);

        
        mesh.rotation.x = Math.PI / 2;
        mesh.position.set(0, 0, 0);

        return mesh;
    }
}