

import lookAtMouse from "./lookAtMouse.js"
export default class Entity {
    constructor(position = { x: 100, y: 100 }) {

        this.size = {
            x: 30,
            y: 30
        }
        
        this.id = this.generateID()
        this.mob = "zombie"
        this.health = 100
        this.isHostile = true
        this.equipped = "none"
        this.color = "rgb(100,0,0)"
        this.position = position
        this.heading = 0;
        this.player = false;
        this.speed = 5;
        this.hasControl = false;
        this.debugData = [
            "ID", this.id,
            "Mob", this.mob,
            "Health", this.health,
            "isHostile", this.isHostile,
            "Equipped", this.equipped,
            "Position", `X: ${this.position.x}, Y: ${this.position.y}`,
            "Heading", this.heading
        ]
        this.debugField;
        this.keysActive = []
        this.up = 0, this.down = 0, this.left = 0, this.right = 0;

        this.upAccel = 0
        this.downAccel = 0
        this.leftAccel = 0
        this.rightAccel = 0
        this.accelSpeed = 0.1
        
    }
    debug() {

        let data = this.debugData
        let dbTable = document.getElementById("debug")
        let table = document.createElement("table")
        for (let i = 0; i < data.length; i++) {
            if (i % 2 == 0) {
                let tr = document.createElement("tr")
                let tdKey = document.createElement("td")
                let tdValue = document.createElement("td")
                tdKey.innerHTML = data[i]
                tdValue.innerHTML = data[i + 1]
                tr.append(tdKey)
                tr.append(tdValue)
                table.append(tr)
            }

        }
        
        dbTable.append(table)
        this.debugField = table
    }
    updateDebug() {

        let field = this.debugField.childNodes
        let type = field[1]
        let health = field[2]
        let position = field[5]
        let heading = field[6]
        type.childNodes[1].innerHTML = this.mob
        health.childNodes[1].innerHTML = this.health
        position.childNodes[1].innerHTML = `X: ${this.position.x.toFixed(2)}, Y: ${this.position.y.toFixed(2)}`
        heading.childNodes[1].innerHTML = this.heading.toFixed(4)
    }


    draw(ctx) {
        ctx.lineWidth = 2
        let x = this.position.x
        let y = this.position.y
        let xCenter = this.size.x / 2
        let yCenter = this.size.y / 2
        ctx.fillStyle = this.color
        ctx.strokeStyle = "black"
        ctx.save()
        ctx.translate(x + xCenter, y + yCenter);
        ctx.rotate(this.heading * (Math.PI / 180))
        ctx.translate(-xCenter, -yCenter);
        ctx.fillRect(0, 0, this.size.x, this.size.y)
        ctx.strokeRect(0, 0, this.size.x, this.size.y)
        ctx.restore()

    }

    set = {
        heading: (heading) => {
            this.heading = heading
            if (heading > 360) this.heading = 0;
            if (heading < 0) this.heading = 360;
        },
        speed: (speed) => {
            this.speed = speed
        }
    }

    get = {
        heading: () => {
            return this.heading
        },
        speed: () => {
            return this.speed
        },
        position: () => {
            return this.position
        },
        size: () => {
            return this.size
        },
        isPlayer: () => {
            return this.player
        }
    }

    behaviour = {
        idle: () => {

        },
        wander: () => {

        },
        follow: () => {

        },
        look: (target) => {
            this.heading = 180 + lookAtMouse(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2, target.position.x + target.size.x / 2, target.position.y + target.size.y / 2)

        }
    }

    addControls = () => {
        this.hasControl = true
        document.addEventListener("keydown", (e) => {
            /*                 console.log(e.key)
                            e.key == "w" ? up = true : null
                            e.key == "s" ? down = true : null
                            e.key == "a" ? left = true : null
                            e.key == "d" ? right = true : null */
            this.keysActive.indexOf(e.code) == -1 ? this.keysActive.push(e.code) : null
        })

        document.addEventListener("keyup", (e) => {
            this.keysActive.splice(this.keysActive.indexOf(e.code), 1);
        })

    }

    update(deltaTime) {
        
        if (this.hasControl == true) {
            this.heading = 180 + lookAtMouse(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2)
        }
        this.keysActive.forEach(key => {
            key == "KeyW" ? this.up = 1 : null;
            key == "KeyS" ? this.down = 1 : null;
            key == "KeyA" ? this.left = 1 : null;
            key == "KeyD" ? this.right = 1 : null;
        })

        this.upAccel <= 1 && this.up == 1 ? this.upAccel += this.accelSpeed * deltaTime: null;
        this.downAccel <= 1 && this.down == 1 ? this.downAccel += this.accelSpeed * deltaTime: null;
        this.leftAccel <= 1 && this.left == 1 ? this.leftAccel += this.accelSpeed * deltaTime : null;
        this.rightAccel <= 1 && this.right == 1 ? this.rightAccel += this.accelSpeed * deltaTime : null;


        this.upAccel > 0 && this.up == 0 ? this.upAccel -= this.accelSpeed * deltaTime : null
        this.downAccel > 0 && this.down == 0 ? this.downAccel -= this.accelSpeed * deltaTime : null
        this.leftAccel > 0 && this.left == 0 ? this.leftAccel -= this.accelSpeed * deltaTime : null
        this.rightAccel > 0 && this.right == 0 ? this.rightAccel -= this.accelSpeed * deltaTime : null

        this.upAccel < 0 ? this.upAccel = 0 : null
        this.downAccel < 0 ? this.downAccel = 0 : null
        this.leftAccel < 0 ? this.leftAccel = 0 : null
        this.rightAccel < 0 ? this.rightAccel = 0 : null

        this.upAccel > 1 ? this.upAccel = 1 : null
        this.downAccel > 1 ? this.downAccel = 1 : null
        this.leftAccel > 1 ? this.leftAccel = 1 : null
        this.rightAccel > 1 ? this.rightAccel = 1 : null


        this.position.x += this.speed * deltaTime * this.rightAccel
        this.position.x -= this.speed * deltaTime * (this.leftAccel)
        this.position.y -= this.speed * deltaTime * (this.upAccel)
        this.position.y += this.speed * deltaTime * (this.downAccel)

        this.up = 0;
        this.down = 0;
        this.left = 0;
        this.right = 0;

    }
    drawID = (ctx) => {
        let text = `${this.mob}`
        ctx.fillStyle = "grey"
        ctx.lineWidth = 3
        ctx.strokeStyle = "black"
        ctx.font = "bold 20px Arial"
        ctx.textAlign='center';
        ctx.strokeText(text, (this.position.x + 1) + this.size.x / 2, this.position.y - 9);
        ctx.fillText(text, this.position.x + this.size.x / 2, this.position.y - 10);
    }
    generateID = () => {
        let buffer = "";
        let charTable = "abcdefghijklmnopqrstuvwxyz123456789"
        for (let i = 0; i < 6; i++) {
            buffer += charTable[Math.floor(Math.random() * charTable.length)]
        }

        return buffer
    }
}




