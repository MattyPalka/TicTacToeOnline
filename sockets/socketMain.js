const io = require('../server').io

let namespaces = require("../data/namespaces")

let turn = 0

io.on('connection', (socket) => {
    //build an array to send back with img and endpoint for each namespace
    let nsData = namespaces.map((ns) => {
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    })
    // send the nsData back to client. Need to use socket, not io, because we want it to go
    // to just this client
    socket.emit('nsList', nsData)

})

//loop through namespaces and listen for a connection
namespaces.forEach((namespace) => {
    io.of(namespace.endpoint).on('connection', (nsSocket) => {
        const username = nsSocket.handshake.query.username
        // a socket has connected to one of the chatgroup namespaces
        // send that namespaces group info back
        nsSocket.emit('nsRoomLoad', namespace.rooms)
        nsSocket.on('joinRoom', (roomToJoin) => {
            // leave previous rooms before joining new one
            const roomToLeave = Object.keys(nsSocket.rooms)[1]
            nsSocket.leave(roomToLeave)
            updateUsersInRoom(namespace, roomToLeave)
            nsSocket.join(roomToJoin)

            const nsRoom = namespace.rooms.find((room) => {
                return room.roomTitle === roomToJoin
            })

            nsSocket.emit('historyCatchUp', nsRoom.history)

            updateUsersInRoom(namespace, roomToJoin)

        })
        nsSocket.on('newMessageToServer', (msg) => {
            const fullMsg = {
                text: msg.text,
                time: Date.now(),
                username: username,
                avatar: "https://via.placeholder.com/30"
            }
            // send that message to all the sockets that are in the room that this socket is in
            // the user will be in the 2nd room in the object list
            // this is because the socket always joins its own room on the connection
            const roomTitle = Object.keys(nsSocket.rooms)[1]

            //we need to find the room object for this room
            const nsRoom = namespace.rooms.find((room) => {
                return room.roomTitle === roomTitle
            })
            nsRoom.addMessage(fullMsg)

            io.of(namespace.endpoint).to(roomTitle).emit('messageToClients', fullMsg)
        })

        nsSocket.on('canvasClickToServer', (data) => {
            // send that message to all the sockets that are in the room that this socket is in
            // the user will be in the 2nd room in the object list
            // this is because the socket always joins its own room on the connection
            const roomTitle = Object.keys(nsSocket.rooms)[1]
            let drawingCenter = calculateGameObjectPosition(data)
            //Check who's turn it is
            if (turn % 2 === 0) {
                io.of(namespace.endpoint).to(roomTitle).emit('drawCross', drawingCenter)
            } else {
                io.of(namespace.endpoint).to(roomTitle).emit('drawCircle', drawingCenter)
            }
        })

        nsSocket.on('resetGame', () => {
            turn = 0
            const roomTitle = Object.keys(nsSocket.rooms)[1]
            io.of(namespace.endpoint).to(roomTitle).emit('clearRect', null)
        })
    })
})

function updateUsersInRoom(namespace, roomTitle) {
    //send back the number of users in this room to all sockets connected to this room
    io.of(namespace.endpoint).in(roomTitle).clients((err, clients) => {
        io.of(namespace.endpoint).in(roomTitle).emit('updateMembers', clients.length)
    })
}

function calculateGameObjectPosition(data) {
    turn++

    let drawingCenter = {
        x: 0,
        y: 0
    }
    //TODO: ADD check if box already clicked

    //decide what box the mouse is at
    if (data.mousePos.x < data.canvasThird) {
        if (data.mousePos.y < data.canvasThird) {
            drawingCenter.x = data.halfBox
            drawingCenter.y = data.halfBox
        } else if (data.mousePos.y > data.canvasThird && data.mousePos.y < (data.canvasThird) * 2) {
            drawingCenter.x = data.halfBox
            drawingCenter.y = data.halfBox * 3
        } else {
            drawingCenter.x = data.halfBox
            drawingCenter.y = data.halfBox * 5
        }
    } else if (data.mousePos.x > data.canvasThird && data.mousePos.x < (data.canvasThird) * 2) {
        if (data.mousePos.y < data.canvasThird) {
            drawingCenter.x = data.halfBox * 3
            drawingCenter.y = data.halfBox
        } else if (data.mousePos.y > data.canvasThird && data.mousePos.y < (data.canvasThird) * 2) {
            drawingCenter.x = data.halfBox * 3
            drawingCenter.y = data.halfBox * 3
        } else {
            drawingCenter.x = data.halfBox * 3
            drawingCenter.y = data.halfBox * 5
        }
    } else {
        if (data.mousePos.y < data.canvasThird) {
            drawingCenter.x = data.halfBox * 5
            drawingCenter.y = data.halfBox
        } else if (data.mousePos.y > data.canvasThird && data.mousePos.y < (data.canvasThird) * 2) {
            drawingCenter.x = data.halfBox * 5
            drawingCenter.y = data.halfBox * 3
        } else {
            drawingCenter.x = data.halfBox * 5
            drawingCenter.y = data.halfBox * 5
        }
    }

    return drawingCenter
}
