const Game = new Phaser.Game(1350, 600, Phaser.AUTO, 'game-canvas', { preload, create,update })

let character, buttons, startbutton

function preload() {
    Game.load.image ('BackGround','Background.png')
    Game.load.spritesheet ('Character','spritesheet.png',6400/4,1600)
    Game.load.spritesheet ('Explosion','exp.png',3000/3,1000)
    
}

function create(){
    let background = Game.add.sprite(0,0,'BackGround')
    Game.stage.backgroundColor = '#182d3b'

    background .width=Game.width
    background.height=Game.height
    startbutton = Game.add.text(500, 500, 'Start', {fill: 'white', shadowColor: 'black'})
    startbutton.setInteractive()
    console.log(startbutton)

     character = Game.add.sprite(0,500, 'Character')
     
    character.scale.set (0.03)
    character.frame=1

   buttons= Game.input.keyboard.createCursorKeys();

   KeyW = Game.input.keyboard.addKey(Phaser.KeyCode.W)
   KeyA = Game.input.keyboard.addKey(Phaser.KeyCode.A)
   KeyS = Game.input.keyboard.addKey(Phaser.KeyCode.S)
   KeyD = Game.input.keyboard.addKey(Phaser.KeyCode.D)
}

function update() {
    // Move with arrow keys 
    if (buttons.right.isDown&&character.x<1325) {
        character.x+=5; 
    }
    if (buttons.left.isDown&&character.x>0) {
        character.x-=5;
    }
    if (buttons.up.isDown&&character.y>0) {
        character.y-=5; 
    }
    if (buttons.down.isDown&&character.y<550) {
        character.y+=5; 
    }
    // Move with WASD
    if (KeyD.isDown&&character.x<1325) {
        character.x+=5; 
    }
    if (KeyA.isDown&&character.x>0) {
        character.x-=5;
    }
    if (KeyW.isDown&&character.y>0) {
        character.y-=5; 
    }
    if (KeyS.isDown&&character.y<550) {
        character.y+=5; 
    }
}