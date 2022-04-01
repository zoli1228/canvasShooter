let canvas = document.querySelector("#gameScreen")
let ctx = canvas.getContext("2d")

export default class DrawDamage {
    constructor(entity) {
        this.position = {
            x: entity.position.x,
            y: entity.position.y
        }
        this.isAlive = true
        this.opacity = 1
        this.target = entity
        this.tick = 0
        this.health = this.target.health
        this.run = true
        this.text = 0

    }
    update() {

        if (this.isAlive) {


            this.position.y -= 1
            this.opacity -= 0.01
            this.tick = 0
            ctx.font = "bold 20px Arial"
            ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`
            
            if(this.run) {
                this.text = "-" + (this.health - this.target.health)
                this.run = false;
            }

            ctx.fillText(this.text, this.position.x, this.position.y - 30)
            
            if (this.opacity <= 0) {
                this.isAlive = false
            }

        }

        /* this.#update() */


    }
}