const canvas = document.querySelector("#gameScreen")
const ctx = canvas.getContext("2d")
let dbtext = document.querySelector("#dbtext")

import Entity from "./scripts/entity.js"
import randomPosition from "./scripts/randomPosition.js"
import Player from "./scripts/player.js"
import fpsCounter from "./scripts/fps.js"
import Reticle from "./scripts/reticle.js"

let entityArray = []
let width = window.innerWidth;
let height = window.innerHeight;


let mouseX = 0, mouseY = 0
document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX
    mouseY = e.clientY
    if (mouseX && mouseY) {
        document.body.style.cursor = "crosshair"
    }

})

let initiateScreen = () => {
    ctx.lineWidth = 2
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "black"
    ctx.strokeRect(30, 30, width - 60, height - 60)


}


let then = performance.now()
let times = [], fps, elapsedSeconds
let loop = () => {

    const now = performance.now();
    elapsedSeconds = Math.round((now - then) / 1000)
    while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
    }
    times.push(now);
    fps = times.length;

    fpsCounter(fps)
    initiateScreen()
    update()
    window.requestAnimationFrame(loop)
}




window.addEventListener("resize", () => {
    width = window.innerWidth
    height = window.innerHeight
})

initiateScreen()
window.requestAnimationFrame(loop)
// Game update function
let player = new Player()
entityArray.push(player)

player.debug()
player.addControls()
player.position = { x: 50, y: 500 }
player.accelSpeed = 0.05

let maxMobs = 40
let reticle = new Reticle()

let update = () => {
    if (entityArray.length < maxMobs) {
        for (let i = 0; i < maxMobs; i++) {
            let mob = new Entity(randomPosition(width, height))
            mob.debug()
            mob.set.speed(1 + Math.random() * 3)
            entityArray.push(mob)

        }
    }
    entityArray.forEach(mob => {
        mob.draw(ctx)
        mob.update()
        mob.updateDebug()
        if (mob.mob != "player") {
            mob.behaviour.look(player)
        }
        if (Math.abs((reticle.position.x + reticle.radius / 2) - (mob.position.x + mob.size.x / 2)) < mob.size.x && Math.abs((reticle.position.y + reticle.radius / 2) - (mob.position.y + mob.size.x / 2)) < mob.size.y) {
            reticle.aimingAt(mob.isHostile)
            mob.drawID(ctx)
        }

    })

    player.updateDebug()
    dbtext.innerHTML = `Up: ${player.upAccel.toFixed(2)}, Down: ${player.downAccel.toFixed(2)}, Left: ${player.leftAccel.toFixed(2)}, Right: ${player.rightAccel.toFixed(2)}`
    reticle.draw(mouseX, mouseY)




    //End of update
}
