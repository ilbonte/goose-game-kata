const Player = require('./Player.js')
// const locaPosition=[5,14,23,9,18,27]
module.exports = class Game {
  constructor(diceRoller = this.getDiceValues) {
    this.players = {}
    this.diceRoller = diceRoller;    
  }
  

  addPlayer(name) {
    if (this.players[name]) {
      return `${name}: giocatore già presente`
    }
    this.players[name] = new Player(name);
    return `Giocatori: ${Object.keys(this.players).join(', ')}`
  }

  movePlayer(name, firstDice=this.diceRoller()[0], secondDice=this.diceRoller()[1]) {
    const player =  this.players[name]
    const startingPosition = player.getPosition()
    
    player.position +=(firstDice+secondDice) 

    if(player.hasWon()){
      return `${name} tira ${firstDice}, ${secondDice}. ${name} muove da ${startingPosition} a ${player.getPosition()}. ${name} vince!!`
    }

    if(player.hasBounced()){
      const overflow = player.position - 63
      player.position = 63 - overflow

      return `${name} tira ${firstDice}, ${secondDice}. ${name} muove da ${startingPosition} a 63. ${name} rimbalza!! ${name} torna a ${player.position}`
    }

    if(player.landsOnBridge()){
      return `${name} tira ${firstDice}, ${secondDice}. ${name} muove da ${startingPosition} a ${player.getPosition()}. ${name} salta al 12`
    }

    if(player.landsOnGoose()){      
      let state =  `${name} tira ${firstDice}, ${secondDice}. ${name} muove da ${startingPosition} a ${player.getPosition()}, oca. `
      player.position += (firstDice+secondDice)
      state+=`${name} muove di nuovo e va a ${player.getPosition()}`
      
      return state
    }    

    

    return `${name} tira ${firstDice}, ${secondDice}. ${name} muove da ${startingPosition} a ${player.getPosition()}.`
  }

  getDiceValues(){
    return [this._getRandomDice(), this._getRandomDice()]
  }

  _getRandomDice() {
    return Math.floor(Math.random() * 6) + 1
  }
}