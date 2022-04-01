import Entity from "./entity.js"
import DrawDamage from "./drawDamage.js"

export default class Player extends Entity {
    constructor(name) {
        super()
        this.name = name || "Player"
        this.color = "green";
        this.speed = 1;
        this.sprintSpeed = 2
        this.normalSpeed = this.speed
        this.mob = "player"
        this.player = true;
        this.isHostile = false;
        this.strength = 5
        this.lvl = 1
        this.attackDelay = 3
    }

    attack(target) {
            this.behaviour.attack(target)
            console.log("Attacked")
    
    }
    
}
