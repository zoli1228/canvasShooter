const canvas = document.querySelector("#gameScreen")
const ctx = canvas.getContext("2d")
let dbtext = document.querySelector("#dbtext")
let maxFps = 60

import gameTick from "./scripts/gameTick.js"
import options from "../data/system_options.js"
import Entity from "./scripts/entity.js"
import randomPosition from "./scripts/randomPosition.js"
import Player from "./scripts/player.js"
import fpsCounter from "./scripts/fps.js"
import Reticle from "./scripts/reticle.js"
import SystemOptions from "../data/system_options.js"

let entityArray = []
let width = window.innerWidth;
let height = window.innerHeight;
let sysOptions = new SystemOptions()

let mouseX = 0, mouseY = 0
let playerIsClicking = false
document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX
    mouseY = e.clientY
    if (mouseX && mouseY) {
        document.body.style.cursor = "crosshair"
    }

})

document.addEventListener("click", () => {
    playerIsClicking = true;
})

let initiateScreen = () => {
    ctx.lineWidth = 2
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "black"
    ctx.strokeRect(30, 30, width - 60, height - 60)


}




let deltaSeconds = 0
let then = Date.now()
let times = [], fps, elapsedSeconds = 0
let loop = (now) => {
    /* const now = Date.now() */
    let elapsed = (now - then) / 1000
    while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
    }
    times.push(now);
    fps = times.length;

    then = now
    deltaSeconds = maxFps * elapsed
    /* console.log(deltaSeconds) */
    fpsCounter(fps)
    initiateScreen()
    update()

    requestAnimationFrame(loop)
}

let maxMobs = 2


window.addEventListener("resize", () => {
    width = window.innerWidth
    height = window.innerHeight
    sysOptions.windowSize.x = width
    sysOptions.windowSize.y = height


})


window.requestAnimationFrame(loop)
// Game update function
let player = new Player("Kovács Jenő")
entityArray.push(player)

player.debug()
player.addControls()
player.position = { x: 50, y: 500 }

let reticle = new Reticle()
let update = () => {
    let tick = gameTick()
    for (let i = 0; i < maxMobs; i++) {
    if (entityArray.length <= maxMobs) {
            if(tick % 100 == 0) {
                let mob = new Entity(randomPosition(width, height))
                mob.debug()
                mob.set.speed(1 + Math.random() * 3)
                entityArray.push(mob)

            }

        }
    }
    entityArray.forEach(mob => {
        if (mob.mob != "player") {
            mob.draw(ctx)
            mob.update(deltaSeconds, tick)
            mob.updateDebug()
            mob.behaviour.look(player)
            mob.behaviour.follow(player)
            if (mob.distanceFromPlayer < 100) {
                mob.behaviour.attack(player)
            }
            if(mob.health < 1) {
                entityArray.splice(entityArray.indexOf(mob), 1)
            }
        }
       

        if (Math.abs((reticle.position.x + reticle.radius / 2) - (mob.position.x + mob.size.x / 2)) < mob.size.x && Math.abs((reticle.position.y + reticle.radius / 2) - (mob.position.y + mob.size.x / 2)) < mob.size.y) {
            reticle.aimingAt(mob.isHostile)
            reticle.target = mob
            mob.drawID(ctx)
        }



    })
    player.draw(ctx)
    if(reticle.target.mob == "zombie") {
        if(reticle.target.distanceFromPlayer < 150) {
            if(playerIsClicking) {
                player.behaviour.attack(reticle.target)
            }
        }
    }
    player.update(deltaSeconds, tick)
    player.updateDebug()
    dbtext.innerHTML = `Up: ${player.upAccel.toFixed(2)}, Down: ${player.downAccel.toFixed(2)}, Left: ${player.leftAccel.toFixed(2)}, Right: ${player.rightAccel.toFixed(2)}`
    reticle.draw(mouseX, mouseY)
    reticle.target = "none"
    playerIsClicking = false




    //End of update
}
