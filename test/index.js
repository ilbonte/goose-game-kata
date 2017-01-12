const assert = require('assert')
const {test} = require('m.test')
const Game = require('../Game.js')

test('add a player to a new game', function () {
   let game = new Game()
   assert.equal(game.addPlayer('Luca'),'Giocatori: Luca')
})

test('add a player to a started game', function () {
   let game = new Game()
   game.addPlayer('Luca')
   assert.equal(game.addPlayer('Mario'),'Giocatori: Luca, Mario')
})

test('add a duplicate player', function () {
   let game = new Game()
   game.addPlayer('Luca')
   assert.equal(game.addPlayer('Luca'),'Luca: giocatore già presente')
})

test('move a player from "Partenza" ', function () {
   let game = new Game()
   game.addPlayer('Luca')
   assert.equal(game.movePlayer('Luca',4,2),'Luca tira 4, 2. Luca muove da Partenza a 6.')
})

test('move a player from another position ', function () {
   let game = new Game()
   game.addPlayer('Luca')
   game.movePlayer('Luca',4,2)
   assert.equal(game.movePlayer('Luca',2,3),'Luca tira 2, 3. Luca muove da 6 a 11.')
})

test('win directly with a single move', function () {
   let game = new Game()
   game.addPlayer('Luca')
   game.movePlayer('Luca',50,10)
   assert.equal(game.movePlayer('Luca',1,2),'Luca tira 1, 2. Luca muove da 60 a 63. Luca vince!!')
})

test('bounce at the end of the trail', function () {
   let game = new Game()
   game.addPlayer('Luca')
   game.movePlayer('Luca',50,10)
   assert.equal(game.movePlayer('Luca',3,2),'Luca tira 3, 2. Luca muove da 60 a 63. Luca rimbalza!! Luca torna a 61')
})

test('game throw dice', function () {
let game = new Game(()=>([4,1]))
   game.addPlayer('Luca')   
   assert.equal(game.movePlayer('Luca'),'Luca tira 4, 1. Luca muove da Partenza a 5.')
})

test('when player lands on Il Ponte he skips to 12', function () {
let game = new Game(()=>([6,0]))
   game.addPlayer('Luca')   
   assert.equal(game.movePlayer('Luca'),'Luca tira 6, 0. Luca muove da Partenza a Il Ponte. Luca salta al 12')
})
