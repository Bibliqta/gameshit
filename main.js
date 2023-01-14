const Game = new Phaser.Game(1350, 600, Phaser.AUTO, 'game-canvas', { preload, create,update });

let character, buttons, startButton, backGround, platform
let canMove = false;

function preload() {
    Game.load.image ('BackGround','Background.png');
    Game.load.spritesheet ('Character','spritesheet.png',6400/4,1600);
    Game.load.spritesheet ('Explosion','exp.png',3000/3,1000);
    Game.load.image('platform', 'rock.png');
}

function create(){
    backGround = Game.add.sprite(0,0,'BackGround');
    backGround.visible = false;

    backGround .width=Game.width;
    backGround.height=Game.height;

    startButton = Game.add.text(Game.width / 2, Game.height / 2, 'Start', { font: '24px Arial', fill: '#fff' });
    startButton.anchor.set(0.5);
    startButton.inputEnabled = true;
    startButton.input.useHandCursor = true;
    startButton.events.onInputDown.add(startGame, this);
    startButton.events.onInputOver.add(onHover, this);
    startButton.events.onInputOut.add(offHover, this);

    character = Game.add.sprite(0,500, 'Character');
    character.scale.set (0.03);
    character.frame=1;
    Game.physics.arcade.enable(character);
    character.body.collideWorldBounds = true;
    character.body.bounce.y = 0.2;
    character.body.gravity.y = 500;
    character.body.linearDamping = 1;
    character.body.drag.set(70);

    platform = Game.add.sprite(0, 550, 'platform');
    Game.physics.arcade.enable(platform);
    platform.body.immovable = true;
    platform.body.allowGravity = false;
    

    buttons= Game.input.keyboard.createCursorKeys();

    KeyA = Game.input.keyboard.addKey(Phaser.KeyCode.A);
    KeyD = Game.input.keyboard.addKey(Phaser.KeyCode.D);
    SpaceKey = Game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    ControlKey = Game.input.keyboard.addKey(Phaser.KeyCode.CONTROL);
}

function update() {
    Game.physics.arcade.collide(character, platform);

    if (!canMove) {
        return;
    }
    // Character movement system 
    if (KeyA.isDown) {
        character.body.velocity.x = -150;
    } else if (KeyD.isDown) {
        character.body.velocity.x = 150;
    } else {
        character.body.velocity.x = 0;
    }

    if (SpaceKey.isDown && character.body.onFloor()) {
        character.body.velocity.y = -400;
    }
}

function onHover() {
    startButton.fill = '#ff0000';
}

function offHover() {
    startButton.fill = '#fff';
}

function startGame(){
    backGround.visible = true;
    canMove = true;
    startButton.visible = false;
}