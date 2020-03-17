function joinRoom(roomName) {
    // Send this room name to the server
    nsSocket.emit('joinRoom', roomName)

    nsSocket.on('historyCatchUp', (history) => {
        const messagesUl = document.querySelector('#messages')
        messagesUl.innerHTML = ""
        history.forEach((msg)=>{
            const newMsg = buildHTML(msg)
            const currentMessages = messagesUl.innerHTML
            messagesUl.innerHTML = currentMessages + newMsg
        })
        messagesUl.scrollTo(0, messagesUl.scrollHeight)
    })
}