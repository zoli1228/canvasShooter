let canvas = document.querySelector("#gameScreen")
let ctx = canvas.getContext("2d")

export default class Reticle {
    constructor() {
        this.radius = 1
        this.collisionRadius = 5
        this.color = "black"
        this.position = { x: 30, y: 30 }
        this.lineWidth = 3
        this.target = "none"

    }

    draw(mouseX, mouseY) {
        this.position = { x: mouseX, y: mouseY }
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    aimingAt(isHostile) {
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        isHostile ? ctx.strokeStyle = "rgb(255,0,0)" : ctx.strokeStyle = "rgb(0,200,0)"
        ctx.arc(this.position.x, this.position.y, this.radius + 10, 0, 2 * Math.PI);
        ctx.stroke();
    }
}