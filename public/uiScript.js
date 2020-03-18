let wHeight = $(window).height()
let wWidth = $(window).width()

let canvas = document.querySelector('#the-canvas')
let context = canvas.getContext('2d')

canvas.height = canvas.width


drawDivisionLines()

canvas.addEventListener('click', onCanvasClick, event)

// draw division between boxes (fields to have user input)
function drawDivisionLines() {
    context.fillStyle = "rgb(0,0,0)"
    context.fillRect(canvas.width / 3, 0, 2, canvas.height)
    context.fillRect((canvas.width / 3) * 2, 0, 2, canvas.height)
    context.fillRect(0, canvas.height / 3, canvas.width, 2)
    context.fillRect(0, (canvas.height / 3) * 2, canvas.width, 2)
}

document.querySelector("#restart-button").addEventListener('click', () => {
    gameReset()
})

