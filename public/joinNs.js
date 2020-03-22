function joinNs(endpoint) {
    // check if nsSocket is actually a socket
    if (nsSocket) {
        nsSocket.close()
        //remove the eventListener for submit before added again
        document.querySelector('#user-input').removeEventListener('submit', formSubmission)
    }
    nsSocket = io(`http://localhost:4000${endpoint}`)
    // listen for nsRoomLoad, which is a list of rooms inside a namespace
    nsSocket.on('nsRoomLoad', (nsRooms) => {
        

        // NOT NEEDED ATM BUT WHEN NEW GAMES ADDED CAN BE USEFUL
        // //add a click listener to each room
        // document.querySelectorAll('.room').forEach((el) => {
        //     el.addEventListener('click', (e) => {
        //         joinRoom(e.target.innerText)
        //     })
        // })

        joinRoom("New Room")

    })

    nsSocket.on('messageToClients', (msg) => {
        const newMsg = buildHTML(msg)
        const msgUl = document.querySelector("#messages")
        msgUl.innerHTML += newMsg
        msgUl.scrollTo(0, msgUl.scrollHeight)
    })

    document.querySelector(".message-form").addEventListener('submit', formSubmission)

    nsSocket.on('drawCircle', (data) => {
        drawCircle(data)
    })
    
    nsSocket.on('drawCross', (data) => {
        drawCross(data)
    })

    nsSocket.on('clearRect', gameReset)
}

function formSubmission(event) {
    event.preventDefault()
    const newMessage = document.querySelector("#user-message")
    nsSocket.emit('newMessageToServer', { text: newMessage.value })
    newMessage.value = ''

}

function buildHTML(msg) {
    const convertedTime = new Date(msg.time).toLocaleString()
    const newHTML = `
    <li>
        <div class="user-image">
            <img src="${msg.avatar}" />
        </div>
        <div class="user-message">
            <div class="user-name-time">${msg.username} <span>${convertedTime}</span></div>
            <div class="message-text">${msg.text}</div>
        </div>
    </li>
    `
    return newHTML
}
