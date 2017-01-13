module.exports = class Player{
  constructor(name){
    this.name = name
    this.position = 0
  }

  getPosition(){
    switch(this.position){
      case 0:
        return "Partenza"
      break
      case 6:
        return "Il Ponte"
      break

      default:
        return this.position
      
    }
    return this.position === 0 ? "Partenza" : this.position
  }

  hasWon(){
    return this.position === 63 ? true : false
  }

  hasBounced(){
    return this.position > 63 ? true : false
  }

  landsOnBridge(){
    return this.position === 6
  }

  landsOnGoose(){
    const locaPosition=[5,14,23,9,18,27]
    return locaPosition.includes(this.position)   
  }
  

}