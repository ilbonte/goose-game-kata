const Player = require('./Player.js')
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
      let state =  `${name} tira ${firstDice}, ${secondDice}. ${name} muove da ${startingPosition} a ${player.getPosition()}`
      
      do{
        state+=`, oca. `
        player.position += (firstDice+secondDice)
        state+=`${name} muove di nuovo e va a ${player.getPosition()}`
      }while(player.landsOnGoose())
            
      return state
    }

    let playerOnTheSamePosition = this.playerLandsOnOccupiedTile(player);
    if(playerOnTheSamePosition){
      playerOnTheSamePosition.position = startingPosition
      return `${name} tira ${firstDice}, ${secondDice}. ${name} muove da ${startingPosition} a ${player.getPosition()}. Su ${player.getPosition()} c'era ${playerOnTheSamePosition.name}, che torna a ${playerOnTheSamePosition.getPosition()}`
    }    

  
    return `${name} tira ${firstDice}, ${secondDice}. ${name} muove da ${startingPosition} a ${player.getPosition()}.`
  }

  playerLandsOnOccupiedTile(movingPlayer){
    let samePosition;
    let foundPlayer;
    Object.keys(this.players).forEach((playerName)=>{
      const player = this.players[playerName]
      if(movingPlayer.name!==playerName){
        if(player.getPosition()===movingPlayer.getPosition()){
          samePosition = true;
          foundPlayer = player;
        }
      }   
    })

    return foundPlayer;
  }

  getDiceValues(){
    return [this._getRandomDice(), this._getRandomDice()]
  }

  _getRandomDice() {
    return Math.floor(Math.random() * 6) + 1
  }
}