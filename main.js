const Game = new Phaser.Game(1350, 600, Phaser.AUTO, 'game-canvas', { preload, create,update });

let character, buttons, startButton, backGround, platform, menuBackground, playButton, titleText, backButton;
let canMove = false;

function preload() {
    Game.load.image ('BackGround','background.png');
    Game.load.spritesheet ('Character','spritesheet.png',6400/4,1600);
    Game.load.image ('platform', 'rock.png');
    Game.load.image ('menuBackground', 'menu_bg.png');
    Game.load.spritesheet ('playButton', 'play_button.png', 64, 64);
    Game.load.spritesheet ('settingsButton', 'settings_button.png', 64, 64);
    Game.load.image ('pauseMenuBackground', 'pause_menu_bg.png');
    Game.load.image ('Back', 'back_button.png')
}

function create(){
    menuBackground = Game.add.sprite(0,0,'menuBackground');
    menuBackground.width = Game.width;
    menuBackground.height = Game.height;
    Game.camera.follow(character);

    titleText = Game.add.text(Game.width / 2, 100, 'The Unknown Villain', { font: '40px Arial', fill: '#fff' });
    titleText.anchor.set(0.5);

    playButton = Game.add.button(Game.width / 2, 300, 'playButton', startGame, this, 0, 0, 1);
    playButton.anchor.set(0.5);
    playButton.scale.set(2);

    settingsButton = Game.add.button(Game.width / 2, 300 + playButton.height + 10, 'settingsButton', openSettings, this);
settingsButton.anchor.set(0.5);
settingsButton.scale.set(2);

    settingsFrame = Game.add.sprite(Game.width / 2, Game.height / 2, 'settingsFrame');
    settingsFrame.anchor.set(0.5);
    settingsFrame.visible = false;
    
    backButton = Game.add.button(Game.width / 2, Game.height / 2, 'Back', goBack)
    backButton.anchor.set(0.5);
    backButton.scale.set(2);
    backButton.visible = false

    backGround = Game.add.sprite(0,0,'BackGround');
    backGround.visible = false;
    backGround.width = Game.width;
    backGround.height = Game.height;

    Game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    Game.camera.follow(character);

    character = Game.add.sprite(0,500, 'Character');
    character.scale.set (0.03);
    character.frame = 1;
    Game.physics.arcade.enable(character);
    character.body.collideWorldBounds = true;
    character.body.drag.set(70);
    character.visible = false;

    platform = Game.add.sprite(500, 480, 'platform');
    Game.physics.arcade.enable(platform);
    platform.body.immovable = true;
    platform.body.allowGravity = false;
    platform.visible = false;

    buttons= Game.input.keyboard.createCursorKeys();

    KeyA = Game.input.keyboard.addKey(Phaser.KeyCode.A);
    KeyD = Game.input.keyboard.addKey(Phaser.KeyCode.D);
    SpaceKey = Game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    ControlKey = Game.input.keyboard.addKey(Phaser.KeyCode.CONTROL);
    let escapeKey = Game.input.keyboard.addKey(Phaser.Keyboard.ESC);
escapeKey.onDown.add(showMenu, this);
this.input.keyboard.on('keydown_ESC', function () {
    this.backButton.destroy();
 }, this);
}

function update() {
    if (!canMove) {
        return;
    }
    Game.physics.arcade.collide(character, platform);

    if (buttons.left.isDown || Game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        character.body.velocity.x = -250;
    } else if (buttons.right.isDown || Game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        character.body.velocity.x = 250;
    } else {
        character.body.velocity.x = 0;
    }
    
    if (buttons.up.isDown || Game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        character.body.velocity.y = -250;
    } else if (buttons.down.isDown || Game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        character.body.velocity.y = 250;
    } else {
        character.body.velocity.y = 0;
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
    settingsButton.visible = false;
    backGround.visible = true;
    character.visible = true;
    canMove = true;
    Game.physics.arcade.isPaused = false;
    canMove = true;
    backButton.visible = false;
    platform.visible = true;
}

import { openSettings } from "./settings";

function goBack() {
    backButton.visible = false;
    menuBackground.visible = true;
    titleText.visible = true;
    playButton.visible = true;
    settingsButton.visible = true;
    settingsFrame.visible = false;
    backGround.visible = false;
    character.visible = false;
    canMove = false;
    Game.physics.arcade.isPaused = true;
    pauseMenuBackground.visible = true;
    pauseTitleText.visible = true;
    settingsButton.visible = true;
    platform.visible = false;
}

function showMenu() {
    backButton.visible = false;
    platform.visible = false;
    menuBackground.visible = true;
    titleText.visible = true;
    playButton.visible = true;
    settingsButton.visible = true;
    settingsFrame.visible = false;
    backGround.visible = false;
    character.visible = false;
    canMove = false;
    Game.physics.arcade.isPaused = true;
    pauseMenuBackground.visible = true;
    pauseTitleText.visible = true;
    settingsButton.visible = true;
}
