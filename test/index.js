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
   assert.equal(game.movePlayer('Luca',4,3),'Luca tira 4, 3. Luca muove da Partenza a 7.')
})

test('move a player from another position ', function () {
   let game = new Game()
   game.addPlayer('Luca')
   game.movePlayer('Luca',4,3)
   assert.equal(game.movePlayer('Luca',1,2),'Luca tira 1, 2. Luca muove da 7 a 10.')
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
let game = new Game(()=>([4,3]))
   game.addPlayer('Luca')   
   assert.equal(game.movePlayer('Luca'),'Luca tira 4, 3. Luca muove da Partenza a 7.')
})

test('when player lands on Il Ponte he skips to 12', function () {
let game = new Game(()=>([6,0]))
   game.addPlayer('Luca')   
   assert.equal(game.movePlayer('Luca'),'Luca tira 6, 0. Luca muove da Partenza a Il Ponte. Luca salta al 12')
})

test('when player lands on the goose it doubles last move', function () {
let game = new Game()
   game.addPlayer('Luca')   
   assert.equal(game.movePlayer('Luca',2,3),'Luca tira 2, 3. Luca muove da Partenza a 5, oca. Luca muove di nuovo e va a 10')
})

test('the player can land on the goose multiple times', function () {
let game = new Game()
   game.addPlayer('Luca')  
   game.movePlayer('Luca',5,5) 
   assert.equal(game.movePlayer('Luca',2,2),'Luca tira 2, 2. Luca muove da 10 a 14, oca. Luca muove di nuovo e va a 18, oca. Luca muove di nuovo e va a 22')
})


test('if a player lands on tile with another player, the other player go back to the first player\'s starting position', function () {
let game = new Game()
   game.addPlayer('Pippo')
   game.addPlayer('Pluto')  
   game.movePlayer('Pippo',15,0)
   game.movePlayer('Pluto',17,0)
 
   assert.equal(game.movePlayer('Pippo',1,1),`Pippo tira 1, 1. Pippo muove da 15 a 17. Su 17 c'era Pluto, che torna a 15`)
})
