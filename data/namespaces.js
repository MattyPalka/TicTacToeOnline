// Bring in the room class
const Namespace =  require('../classes/Namespace');
const Room =  require('../classes/Room');

// Set up the namespaces
let namespaces = [];
let ticTacToeNs = new Namespace(0,'ticTacToe','https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Jogo_da_velha_-_tic_tac_toe.png/284px-Jogo_da_velha_-_tic_tac_toe.png','/ticTacToe');




// Make the main room and add it to rooms. it will ALWAYS be 0
ticTacToeNs.addRoom(new Room(0,'New Room','ticTacToe'));


namespaces.push(ticTacToeNs);

module.exports = namespaces;