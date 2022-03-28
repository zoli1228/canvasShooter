import Entity from "./entity.js"


export default class Player extends Entity {
    constructor() {
        super()
        this.color = "green";
        this.speed = 2;
        this.mob = "player"
        this.player = true;
        
        
    }
    
}
