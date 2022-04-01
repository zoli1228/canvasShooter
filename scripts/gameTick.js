let gameTick = 0
export default function() {
    gameTick++
    if(gameTick > 1000) {
        gameTick = 0
    }
    return gameTick
}