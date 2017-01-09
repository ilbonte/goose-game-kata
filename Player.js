module.exports = class Player{
  constructor(name){
    this.name = name
    this.position = 0
  }

  getPosition(){
    return this.position === 0 ? "Partenza" : this.position
  }

}