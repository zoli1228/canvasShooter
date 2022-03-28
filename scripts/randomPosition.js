export default function (width, height) {
    return {
        x: 30 + Math.round(Math.random() * (width - 90)),
        y: 30 + Math.round(Math.random() * (height - 90))
    }
}