const { Game } = require("phaser-ce");

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

let background, startbutton, character

function preload() {

    game.load.image('background','background.png')

}

function create() {

    game.stage.backgroundColor = '#182d3b'

    background = game.add.tileSprite(0, 0, 800, 600, 'background')
    startbutton = Game.add.button("Press Me",6,2,G.CHANGE_STATE,"StateLevels",32,'#ffffff');

'
}

function actionOnClick () {

    background.visible =! background.visible

}
