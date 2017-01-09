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
   assert.equal(game.movePlayer('Luca',4,2),'Luca tira 4, 2. Luca muove da Partenza a 6')
})

test('move a player from another position ', function () {
   let game = new Game()
   game.addPlayer('Luca')
   game.movePlayer('Luca',4,2)
   assert.equal(game.movePlayer('Luca',2,3),'Luca tira 2, 3. Luca muove da 6 a 11')
})