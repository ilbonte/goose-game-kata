const Player = require('./Player.js')

module.exports = class Game {
  constructor() {
    this.players = {}
  }
  

  addPlayer(name) {
    if (this.players[name]) {
      return `${name}: giocatore già presente`
    }
    this.players[name] = new Player(name);
    return `Giocatori: ${Object.keys(this.players).join(', ')}`
  }

  movePlayer(name, firstDice, secondDice) {
    const player =  this.players[name]
    const startingPosition = player.getPosition()
    player.position +=(firstDice+secondDice) 
    return `${name} tira ${firstDice}, ${secondDice}. ${name} muove da ${startingPosition} a ${player.getPosition()}`
  }

  _getRandomDice() {
    return Math.floor(Math.random() * 6) + 1
  }
}