import { EventEmitter } from 'events';
import { Plane } from './Plane/Plane';

import { Group, Scene } from 'three';
import { variableIds } from './Plane/indexId';
import { IPlaneParams } from './Plane/types';
import { randomInteger } from './utils/randomInteger';
import { shuffle } from './utils/shuffle';

const ID = [3.5, 0];
// const ID = [3,2];
// const END = [2,2];


export class AnimationFrame {
    public event: EventEmitter;

    protected group: Group;
    protected squares: Plane[];
    
    public constructor(scene: Scene) {
        this.event = new EventEmitter();
        this.event.on('turned', this.addPlane.bind(this));
        this.squares = [];
        this.group = new Group();
        scene.add(this.group);

        // setInterval(() => {
        //     this.addRandomPlane(false, randomInteger(150, 800));
        // }, 150);
    }

    public update(time: number): void {
        if (!this.squares.length) {          
            const plane = new Plane({
                id: ID,
                square: ID,
                isFirst: true,
                emmitable: true,
                duration: 200
            }, this.event);
            this.squares.push(plane);
            this.group.add(plane.square);
        }
        this.squares.forEach(item => {
            item.turn(time);
        });

    }

    protected addPlane(planeId: number[], variableId: number[][], duration: number): void {
        // if (this.squares.length > 1) return;
        let filteredIds = variableId.filter(item => 
            !this.squares.find(s => s.id[0] === item[0] && s.id[1] === item[1])
        );
    
        const index = randomInteger(0, filteredIds.length-1);
    
        let endPoint = filteredIds[index];
    
        let params: IPlaneParams = { id: endPoint, square: planeId, emmitable: true, duration };
        if (!endPoint) {
            this.addRandomPlane(true, duration);
            return;
        }
        // params = { id: END, square: ID, emmitable: false, duration: 900 };
        const plane = new Plane(params, this.event);
        this.squares.push(plane);
        this.group.add(plane.square);
        
        this.addRandomPlane(false, 800);
    }

    public addRandomPlane(emmitable: boolean, duration: number): void {
        let params: IPlaneParams = {
            duration,
            emmitable,
            id: [],
            square: [],
        };
        shuffle(this.squares);
        for(let plane of this.squares) {
            
            let filteredIds = variableIds(plane.id).filter(item => 
                !this.squares.find(s => s.id[0] === item[0] && s.id[1] === item[1])
            );   
        
            if (filteredIds.length) {
                const endPoint = filteredIds[randomInteger(0, filteredIds.length-1)];
            
                params.id = endPoint;
                params.square = plane.id; 
                break;
            }
        }
        if (params.id.length) {
            const plane = new Plane(params, this.event);
            this.squares.push(plane);
            this.group.add(plane.square);
        }
    }

}

