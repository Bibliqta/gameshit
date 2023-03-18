const Game = new Phaser.Game(640, 640, Phaser.AUTO, 'game-canvas', { preload, create,update });

let character, buttons, startButton, background, rock, menuBackground, playButton, titleText, backButton, weapon, l1, l2, l3, l4;
let canMove = false;

function preload() {
    Game.load.tilemap('background','karta.json',null,Phaser.Tilemap.TILED_JSON);
    Game.load.image('marketplace','32x32_tileset_old_marketplace.png');
    Game.load.image('terrain','32x32_tileset_terrains_1.png');
    Game.load.image('vikingcity','32x32_tileset_vikings_city.png');
    Game.load.image('castle','32x32_tileset_terrains_castle.png');
    Game.load.spritesheet ('Character','spritesheet.png',6400/4,1600);
    Game.load.image ('rock', 'rock.png');
    Game.load.image ('menuBackground', 'menu_bg.png');
    Game.load.spritesheet ('playButton', 'play_button.png', 64, 64);
    Game.load.spritesheet ('settingsButton', 'settings_button.png', 64, 64);
    Game.load.image ('Back', 'back_button.png');
}

function create(){
    menuBackground = Game.add.sprite(0,0,'menuBackground');
    menuBackground.width = Game.width;
    menuBackground.height = Game.height;

    titleText = Game.add.text(Game.width / 2, 100, 'The Unknown Villain', { font: '40px Arial', fill: '#fff' });
    titleText.anchor.set(0.5);

    playButton = Game.add.button(Game.width /2, 300, 'playButton', startGame, this, 0, 0, 1);
    playButton.anchor.set(0.5);
    playButton.scale.set(2);

    settingsButton = Game.add.button(Game.width / 2, 300 + playButton.height + 10, 'settingsButton',openSettings, this);
    settingsButton.anchor.set(0.5);
    settingsButton.scale.set(2);

    settingsFrame = Game.add.sprite(Game.width / 2, Game.height / 2, 'settingsFrame');
    settingsFrame.anchor.set(0.5);
    settingsFrame.visible = false;
    
    background = Game.add.tilemap('background');
    background.addTilesetImage('32x32_tileset_old_marketplace','marketplace');
    background.addTilesetImage('32x32_tileset_terrains_1','terrain');
    background.addTilesetImage('32x32_tileset_vikings_city','vikingcity');
    background.addTilesetImage('32x32_tileset_terrains_castle','castle');
    
    l1= background.createLayer('layer1');
    l2 = background.createLayer('layer2');
    l3 = background.createLayer('layer3');
    l4 = background.createLayer('layer4');
     l1.visible=false;
     l2.visible=false;
     l3.visible=false;
     l4.visible=false;

  
     background.setCollisionByExclusion([],true,l3)
    character = Game.add.sprite(0,500, 'Character');
    character.scale.set (0.02);
    character.frame = 1;
    Game.physics.arcade.enable(character);
    character.body.collideWorldBounds = true;
    character.body.drag.set(70);
    character.visible = false;

    rock = Game.add.sprite(500, 480, 'rock');
    Game.physics.arcade.enable(rock);
    rock.body.immovable = true;
    rock.body.allowGravity = false;
    rock.visible = false;

    buttons= Game.input.keyboard.createCursorKeys();

    KeyA = Game.input.keyboard.addKey(Phaser.KeyCode.A);
    KeyD = Game.input.keyboard.addKey(Phaser.KeyCode.D);
    SpaceKey = Game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    ControlKey = Game.input.keyboard.addKey(Phaser.KeyCode.CONTROL);
    var escapeKey = Game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    escapeKey.onUp.add(showMenu);
}

function update() {
    if (!canMove) {
        return;
    }

    Game.physics.arcade.collide(character, rock);

    // Handle player movement
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

    // Collide the player character with the third layer of the tilemap
    Game.physics.arcade.collide(character, l3, call);
}


function call() {
    console.log("Player collided with third layer of tilemap");
}

function onHover() {
    startButton.fill = '#ff0000';   
}

function offHover() {
    startButton.fill = '#fff';
}

function backgroundlayers(_x) {
      l1.visible = _x;
      l2.visible = _x;
      l3.visible = _x;
      l4.visible = _x;
}

function startGame() {
    menuBackground.visible = false;
    titleText.visible = false;
    playButton.visible = false;
    settingsButton.visible = false;
    backgroundlayers(true);
    character.visible = true;
    canMove = true;
    Game.physics.arcade.isPaused = false;
    canMove = true;
    backButton.visible = false;
    rock.visible = true;
    Game.world.setBounds(0,0,Game.width*2,Game.height*2);
    Game.camera.follow(character);

}

function openSettings() {
    menuBackground.visible = true;
    backgroundlayers(false);
    titleText.visible = false;
    playButton.visible = false;
    character.visible = false;
    settingsButton.visible = false;
    settingsFrame.visible = true;
    backButton.visible = true;
    rock.visible = false;
    Game.camera.setPosition(0 , 0);
}


function goBack() {
    backButton.visible = false;
    backgroundlayers(false);
    menuBackground.visible = true;
    titleText.visible = true;
    playButton.visible = true;
    settingsButton.visible = true;
    settingsFrame.visible = false;
    background.visible = false;
    character.visible = false;
    canMove = false;
    Game.physics.arcade.isPaused = true;
    pauseMenuBackground.visible = true;
    pauseTitleText.visible = true;
    settingsButton.visible = true;
    rock.visible = false;
}

function showMenu() {
    console.log('Menu shown');
    backButton.visible = false;
    rock.visible = false;
    backgroundlayers(false);
    menuBackground.visible = true;
    titleText.visible = true;
    playButton.visible = true;
    settingsButton.visible = true;
    settingsFrame.visible = false;
    background.visible = false;
    character.visible = false;
    canMove = false;
    Game.physics.arcade.isPaused = true;
    pauseMenuBackground.visible = true;
    pauseTitleText.visible = true;
    settingsButton.visible = true;
    Game.camera.setPosition(0, 0);
}
