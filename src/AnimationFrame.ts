import { EventEmitter } from 'events';
import { Plane } from './Plane/Plane';

import { Group, Scene } from 'three';
import { variableIds } from './Plane/indexId';

// const ID =  [3.5, 0];
const ID =  [1.5, 0];
const END = [1, 3];

function randomInteger(min: number, max: number) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
window['randomInteger'] = randomInteger;

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
                isFirst: true 
            }, this.event);
            this.squares.push(plane);
            this.group.add(plane.square);
        }
        this.squares.forEach(item => {
            item.turn(time);
        });

    }

    protected addPlane(planeId: number[], variableId: number[][]): void {
        if(this.squares.length > 1) return;
        
        let filteredIds = variableId.filter(item => 
            !this.squares.find(s => s.id[0] === item[0] && s.id[1] === item[1])
            );
    
        const index = randomInteger(0, filteredIds.length-1);
    
        let endPoint = filteredIds[index];
    
        let params = { id: endPoint, square: planeId };
        if (!endPoint) {
            for(let plane of this.squares) {
            
                let filteredIds = variableIds(plane.id).filter(item => 
                    !this.squares.find(s => s.id[0] === item[0] && s.id[1] === item[1])
                );   
            
                if (filteredIds.length) {
                    endPoint = filteredIds[randomInteger(0, filteredIds.length-1)];
                
                    params = { id: endPoint, square: plane.id }
                    break;
                } else {

                }
            }
            console.log('END CYCLE\n');
        }
        if (!endPoint) {
            console.log(endPoint);
            return;
        }
        params = { id: END, square: ID };
        const plane = new Plane(params, this.event);
        
        this.squares.push(plane);
        this.group.add(plane.square);
    }

}

