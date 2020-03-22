
function onCanvasClick(event) {
    
    let dataToServer = {}
    dataToServer.canvasThird = canvas.height / 3
    dataToServer.mousePos = getMousePosition(canvas, event)
    //half of the box where object should be drawn. Useful as the center is needed for the 
    //drawing. Multiply to get to other boxes. 
    //e.g. drawing 
    // x: halfBox y: halfBox --> object drawn in upper left box
    // x: halfBox * 5 y: halfBox * 3 --> object drawn middle right 
    dataToServer.halfBox = canvas.width/6
    
    nsSocket.emit('canvasClickToServer', dataToServer)
}

function drawCross(centerObject){
    // draw X when clicked on canvas
    context.moveTo(centerObject.x - 25, centerObject.y - 25)
    context.lineTo(centerObject.x + 25, centerObject.y + 25)
    context.moveTo(centerObject.x + 25, centerObject.y - 25)
    context.lineTo(centerObject.x - 25, centerObject.y + 25)
    context.stroke()
}

function drawCircle (centerObject){
    // draw O when clicked on canvas
    context.beginPath()
    context.arc(centerObject.x, centerObject.y, 25, 0, Math.PI * 2)
    context.stroke()
}

function getMousePosition(canvas, evt){
    let rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function gameReset(){
    context.clearRect(0,0, canvas.width, canvas.height)
    drawDivisionLines()
    turn = 0

    //TODO WHEN ACTUALLY IMPLEMENTED: 
    // * ADD SCORE? * RESET THE ARRAY WITH FIELDS 
}