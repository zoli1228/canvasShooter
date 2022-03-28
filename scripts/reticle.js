
export default class Reticle {
    constructor() {
        this.radius = 5
        this.collisionRadius = 5
        this.color = "blue"
        this.position = { x: 30, y: 30 }
        this.color = 'rgba(0,0,255,.8)';
        this.lineWidth = 3
    }

    draw(ctx, mouseX, mouseY) {
        this.position = { x: mouseX, y: mouseY }
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}