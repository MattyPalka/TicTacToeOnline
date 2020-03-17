# TicTacToeOnline
This is TicTacToe game that you can play online. With a chat messages. It communicates over websockets (socket.io)


Have you ever been bored at work? Or with a friend? Especially now, when we should self isolate and don't spend much time with other people. We love to communicate! And we love to play games. Here is the tic tac toe game that won't require you to phisically meet other people! And also you will be able to chat with them over instant messaging! 

Could staying alone be more social?


# TODO!
 1. Make chat working (socket connection, updating the DOM, etc)
 2. Add login (probably at this stage the prompt message to put user name is OK)
 3. Create game logic locally 
  * object drawing
  * clicking on the right box 
  * find winner and advrtise it
  * play in turn (probably in the later stage when there is a socket connection so we can determine, who (what socket) had their turn)
 4. Move game logic to the server, handle everthing on it except drawing
 5. Add nice UI login, probably on modal, that can also handle if the person whats to connect to a room or start (see next point) a new one
  * I don't think there is any reason for the auth login for this game, but this may be something to consider at the later stage 
 6. Create rooms and if there are more then two players push the next connection to another room (there cannot be more than two people playing in the same room at the same time, against the rules (and common sense)):
  * probably what needs to happen is to have a UI element with the rooms so you can connect to the room that you want
  * or it can be achieved with uuid (or some other random number) so that the user can be asked to what room they want to join the game
 7. Polish UI
  
 
