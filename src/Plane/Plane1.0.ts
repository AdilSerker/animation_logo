// import { EventEmitter } from 'events';
// import {
//     DoubleSide,
//     Mesh,
//     MeshPhysicalMaterial,
//     PlaneGeometry,
//     Vector2
// } from "three";
// import { getMeshById } from './getParamsById';
// import { Axis, IMeshParams, IPlaneParams, PlaneType } from './types';

// const GREEN_MATERIAL = {
//     clearCoat: 0,
//     color: 0x519b0b,
//     metalness: 0,
//     reflectivity: 0,
//     roughness: 1,
//     side: DoubleSide
// };

// export class Plane {
//     public isTurned: boolean;
//     public mesh: Mesh;

//     protected planeType: PlaneType;
//     protected depth: number;
//     protected position: Vector2;
//     protected axis: Axis;
//     protected spin: number;
//     protected pi: boolean;

//     protected isFirst: boolean;
//     protected simmetry: boolean;

//     protected t0: number;
//     protected duration: number;
    
//     protected event: EventEmitter;
    
//     protected timingFunction: boolean;

//     protected params: IPlaneParams;
    
//     public constructor({
//             planeType,
//             depth,
//             position,
//             axis,
//             simmetry,
//             spin,
//             isFirst = false,
//             pi = true
//         }: IPlaneParams,
//         event: EventEmitter
//     ) {
//         this.mesh = this.getMesh({ axis, planeType, depth, position, simmetry });
//         this.axis = axis || this.randomAxis(planeType);
//         this.spin = spin ? 1 : spin === false ? -1 : this.getRandomSpin();
//         this.duration = 50;
//         this.isFirst = isFirst;
//         this.event = event;
//         this.timingFunction = false;
//         this.pi = pi;

//         this.params = {
//             axis,
//             depth,
//             pi,
//             planeType,
//             position,
//             simmetry
//         }
//     }

//     public turn(time: number): void {
//         this.t0 = this.t0 || time;

//         const timeFraction = (time - this.t0) / this.duration;
//         if (timeFraction > 1 && !this.isTurned) {
//             this.event.emit('turned', new Plane({
//                 ...getMeshById(),
//                 isFirst: false
//             }, this.event));
//             this.isTurned = true;
//         }
//         if (this.isFirst) {
//             return;
//         }
//         this.mesh.rotation[this.axis] = 
//             (this.pi ? Math.PI : this.spin > 0 ? Math.PI / 2 : -1 * Math.PI / 2) *
//             (this.timingFunction ? this.easeInExpo(timeFraction) : this.easeOutExpo(timeFraction));
//     }

//     protected easeInExpo(pos: number) {
//         return (pos===0) ? 0 : Math.pow(2, 10 * (pos - 1));
//     }

//     protected easeOutExpo(pos: number) {
//         return (pos===1) ? 1 : -Math.pow(2, -10 * pos) + 1;
//     }
        
//     protected getRandomSpin(): number {
//         return (Math.random() * 2 - 1) > 0 ? 1 : -1;
//     }

//     protected randomAxis(planeType: PlaneType): Axis {
//         const MIN = 1;
//         const MAX = 3;
//         let rand: number;
//         if (planeType === PlaneType.XY) {
//             rand = Math.floor(MIN + Math.random() * (MAX + 1 - MIN));
//             return rand === 1 ? Axis.X : Axis.Z;
//         }
//         if (planeType === PlaneType.YZ) {
//             rand = Math.floor(MIN + Math.random() * (MAX + 1 - MIN));
//             return rand === 1 ? Axis.Z : Axis.Y;
//         }

//         rand = Math.floor(MIN + Math.random() * (MAX + 1 - MIN));
//         return rand === 1 ? Axis.X : Axis.Y;
//     }

//     protected getMesh({ planeType, depth, position, simmetry, axis }: IMeshParams): Mesh {
//         const geometry = new PlaneGeometry(10, 10);
//         const material = new MeshPhysicalMaterial(GREEN_MATERIAL);
//         const mesh = new Mesh(geometry, material);
//         switch (planeType) {
//             case PlaneType.XY:
//                 geometry.translate(
//                     position.x * 5,
//                     position.y * 5,
//                     0
//                 );
//                 geometry.rotateX(Math.PI / 2);
//                 mesh.position.y = depth * 10;
//                 break;

//             case PlaneType.YZ:
//                 geometry.translate(
//                     position.x * 5,
//                     (position.y > 0 ? 1 : -1) * 5,
//                     0
//                 );
//                 geometry.rotateY(Math.PI / 2);
//                 mesh.position.x = depth * 10;
//                 if (Math.abs(position.y) > 1) {
//                     mesh.position.y = (position.y > 0 ? 1 : -1) * 10;
//                 }
//                 break;

//             case PlaneType.XZ:
//                 geometry.translate(
//                     position.x * 5,
//                     (position.y > 0 ? 1 : -1) * 5,
//                     0
//                 );
//                 mesh.position.z = depth * 10;
//                 if (Math.abs(position.y) > 1) {
//                     mesh.position.y = (position.y > 0 ? 1 : -1) * 10;
//                 }
//                 break;
//             default:
//                 break;
//         }
        
//         return mesh;
//     }
// }