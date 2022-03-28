let fpsCounter = document.querySelector("#fps")

export default function(fps) {
    fpsCounter.innerHTML = Math.round(fps)
}