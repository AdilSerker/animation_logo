import { EventEmitter } from 'events';
import { Plane } from './Plane/Plane';

import { Group, Scene } from 'three';
import { variableIds } from './Plane/indexId';
import { IPlaneParams } from './Plane/types';

const ID = [3.5, 0];

function randomInteger(min: number, max: number) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

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
    }

    public update(time: number): void {
        if (!this.squares.length) {          
            const plane = new Plane({
                id: ID,
                square: ID,
                isFirst: true,
                emmitable: true
            }, this.event);
            this.squares.push(plane);
            this.group.add(plane.square);
        }
        this.squares.forEach(item => {
            item.turn(time);
        });

    }

    protected addPlane(planeId: number[], variableId: number[][]): void {
        // this.addRandomPlane();
        let filteredIds = variableId.filter(item => 
            !this.squares.find(s => s.id[0] === item[0] && s.id[1] === item[1])
        );
    
        const index = randomInteger(0, filteredIds.length-1);
    
        let endPoint = filteredIds[index];
    
        let params = { id: endPoint, square: planeId, emmitable: true };
        if (!endPoint) {
            this.addRandomPlane(true, 150);
            return;
        }
        this.addRandomPlane(false);
        const plane = new Plane(params, this.event);
        
        this.squares.push(plane);
        this.group.add(plane.square);
    }

    public addRandomPlane(emmitable: boolean, duration: number = 900): void {
        let params: IPlaneParams = {
            duration,
            emmitable,
            id: [],
            square: [],
        };
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

