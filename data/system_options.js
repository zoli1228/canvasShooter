//System related options
let canvas = document.querySelector("#gameScreen")
let windowSize = {
    x: window.innerWidth,
    y: window.innerHeight
    }

export default class SystemOptions {
    constructor() {
        this.windowSize = windowSize
        console.log("System options loaded")
 
    }

    update () {
        console.log(this.windowSize)
    }
}