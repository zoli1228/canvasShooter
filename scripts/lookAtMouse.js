let mouseX = 0
let mouseY = 0

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})

export default function (viewerPosX, viewerPosY, targetX = mouseX, targetY = mouseY) {
    
        let rad = Math.atan2(targetX - viewerPosX, targetY - viewerPosY)
        
        return -rad * (180 / Math.PI)
    }