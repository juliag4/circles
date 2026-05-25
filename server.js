const express = require('express');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 3000;
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const GameState = require('./public/src/GameState.js');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

let room = '';
let gamestate = null;

// Handle a socket connection request from web client
const connections = [null, null, null, null, null, null, null, null];
io.on('connection', socket => {
    // Find an available player number
    let playerIndex = -1;
    for(const i in connections){
        if(connections[i] === null){
            playerIndex = i;
            break;
        }
    } 
    
    // Tell the connecting client what player number they are
    socket.emit('player-number', playerIndex);
    console.log(`Player ${playerIndex} has connected`);
    
    if(playerIndex === -1){ return; }
    
    connections[playerIndex] = true;
    
    // Tell everyone what player number has connected
    socket.broadcast.emit('player-connection', playerIndex);
    
    socket.on('join', (roomId) => {
        socket.join('Room 1');
        if(!game){
            gamestate = new GameState();
        }
        console.log(socket.id);
        gamestate.addPlayer(socket.id);
    });
    
    socket.on('mouseMove', (mouseData) => {
        if(gamestate.players[socket.id]){
          gamestate.players[socket.id].calculateMoves(mouseData.x, mouseData.y);
        }
    });

    socket.on('disconnect', () => {
        gamestate.deletePlayer(socket.id);
    });
});

setInterval(() => {
    io.emit('state', {players: gamestate.players, food: gamestate.foodCollection});
}, 1000);
