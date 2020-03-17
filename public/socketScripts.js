const username = prompt("What is your name?")

const socket = io("http://localhost:4000", {
    query: {
        username: username
    }
})
let nsSocket = ""

//listen for nsList, which is a list of all namespaces
socket.on('nsList', (nsData)=>{
    
    joinNs('/ticTacToe')
})
