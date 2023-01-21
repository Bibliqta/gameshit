const Game = new Phaser.Game(1350, 600, Phaser.AUTO, 'game-canvas', { preload, create,update });

let character, buttons, startButton, backGround, platform, menuBackground, playButton, titleText;
let canMove = false;

function preload() {
    Game.load.image ('BackGround','Background.png');
    Game.load.spritesheet ('Character','spritesheet.png',6400/4,1600);
    Game.load.image('platform', 'rock.png');
    Game.load.image('menuBackground', 'menu_bg.png');
    Game.load.spritesheet('playButton', 'play_button.png', 64, 64);
}

function create(){
    menuBackground = Game.add.sprite(0,0,'menuBackground');
    menuBackground.width = Game.width;
    menuBackground.height = Game.height;

    titleText = Game.add.text(Game.width / 2, 100, 'My Game', { font: '40px Arial', fill: '#fff' });
    titleText.anchor.set(0.5);

    playButton = Game.add.button(Game.width / 2, 300, 'playButton', startGame, this, 0, 0, 1);
    playButton.anchor.set(0.5);
    playButton.scale.set(2);

    settingsButton = Game.add.button(Game.width - 50, 50, 'settingsButton', openSettings, this);
    settingsButton.scale.set(0.5);

    settingsFrame = Game.add.sprite(Game.width / 2, Game.height / 2, 'settingsFrame');
    settingsFrame.anchor.set(0.5);
    settingsFrame.visible = false;

    backGround = Game.add.sprite(0,0,'BackGround');
    backGround.visible = false;
    backGround.width = Game.width;
    backGround.height = Game.height;

    character = Game.add.sprite(0,500, 'Character');
    character.scale.set (0.03);
    character.frame = 1;
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
    if (!canMove) {
        return;
    }
    Game.physics.arcade.collide(character, platform);

    if (KeyA.isDown) {
        character.body.velocity.x = -150;
    } else if (KeyD.isDown) {
        character.body.velocity.x = 150;
    } else {
        character.body.velocity.x = 0;
    }

    if
 (SpaceKey.isDown && character.body.onFloor()) {
        character.body.velocity.y = -400;
    }
}

function onHover() {
    startButton.fill = '#ff0000';
}

function offHover() {
    startButton.fill = '#fff';
}

function startGame() {
    menuBackground.visible = false;
    titleText.visible = false;
    playButton.visible = false;
    backGround.visible = true;
    canMove = true;
}

function openSettings() {
    menuBackground.visible = false;
    titleText.visible = false;
    playButton.visible = false;
    settingsButton.visible = false;
    settingsFrame.visible = true;
}