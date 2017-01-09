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
    let lastMovesText = ""

    player.position +=(firstDice+secondDice) 

    if(player.hasWon()){
      lastMovesText = ` ${name} vince!!`
    }

    if(player.hasBounced()){

      const overflow = player.position - 63
      player.position = 63 - overflow
      
      lastMovesText = ` ${name} rimbalza!! ${name} torna a ${player.position}`
    }

    /*oppure spostare tutto nella classe player? 
    tipo fare 
    lastMovesText = player.bouncePosition()
    dove
    bouncePosition(){
      if(player.hasBounced()){

      const overflow = player.position - 63
      player.position = 63 - overflow
      
      lastMovesText = ` ${name} rimbalza!! ${name} torna a ${player.position}`
    }
    return lastMovesText
    }
        
    */

    return `${name} tira ${firstDice}, ${secondDice}. ${name} muove da ${startingPosition} a ${player.getPosition()}.${lastMovesText}`
  }

  _getRandomDice() {
    return Math.floor(Math.random() * 6) + 1
  }
}