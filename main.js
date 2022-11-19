const Game = new Phaser.Game(1350, 600, Phaser.AUTO, 'game-canvas', { preload, create })

function preload() {
    Game.load.image ('BackGround','Background.png')
    Game.load.spritesheet ('Character','spritesheet.png',6400/4,1600)
}

function create() {
    const background = Game.add.sprite(0,0,'BackGround')
    background.width = Game.width
    background.height = Game.height
    
    const character = Game.add.sprite(0,500, 'Character')
    character.scale.set (0.03)
    character.frame=1
    
    const animationchar = character.animations.add('',[],10,true)
    animationchar.play()
}

function update() {

    character.x + 2
}    