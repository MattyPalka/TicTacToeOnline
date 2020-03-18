let turn = 0
function onCanvasClick(event) {
    turn ++
    let mousePos = getMousePosition(canvas, event)

    //half of the box where object should be drawn. Useful as the center is needed for the 
    //drawing. Multiply to get to other boxes. 
    //e.g. drawing 
    // x: halfBox y: halfBox --> object drawn in upper left box
    // x: halfBox * 5 y: halfBox * 3 --> object drawn middle right 
    let halfBox = canvas.width/6

    let drawingCenter = {
        x: 0,
        y: 0
    }
    //TODO: ADD check if box already clicked

    //decide what box the mouse is at
    if (mousePos.x < canvas.width/3) {
        if (mousePos.y < canvas.height / 3) {
            drawingCenter.x = halfBox
            drawingCenter.y = halfBox
        } else if (mousePos.y > canvas.height/3 && mousePos.y < (canvas.height/3) * 2) {
            drawingCenter.x = halfBox 
            drawingCenter.y = halfBox * 3
        } else {
            drawingCenter.x = halfBox 
            drawingCenter.y = halfBox * 5
        }
    } else if (mousePos.x > canvas.width/3 && mousePos.x < (canvas.width / 3) * 2){
        if (mousePos.y < canvas.height / 3) {
            drawingCenter.x = halfBox * 3
            drawingCenter.y = halfBox 
        } else if (mousePos.y > canvas.height/3 && mousePos.y < (canvas.height/3) * 2) {
            drawingCenter.x = halfBox * 3
            drawingCenter.y = halfBox * 3
        } else {
            drawingCenter.x = halfBox * 3
            drawingCenter.y = halfBox * 5
        }
    } else {
        if (mousePos.y < canvas.height / 3) {
            drawingCenter.x = halfBox * 5
            drawingCenter.y = halfBox 
        } else if (mousePos.y > canvas.height/3 && mousePos.y < (canvas.height/3) * 2) {
            drawingCenter.x = halfBox * 5
            drawingCenter.y = halfBox * 3
        } else {
            drawingCenter.x = halfBox * 5
            drawingCenter.y = halfBox * 5
        }
    }

    //Check who's turn it is
    if (turn % 2 === 0){
        drawCross(drawingCenter)
    } else {
        drawCircle(drawingCenter)
    }
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