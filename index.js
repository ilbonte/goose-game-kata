const Game = require('./Game.js')
let game = new Game()
game.addPlayer('Pippo')
game.addPlayer('Pluto')  
game.movePlayer('Pippo',15,0)
game.movePlayer('Pluto',17,0)

console.log(game.movePlayer('Pippo',1,1));
