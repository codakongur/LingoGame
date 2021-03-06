'use strict'
Lingo.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

Lingo.Preloader.prototype ={
	//preloads images for game.js
	preload: function () {

		this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		this.load.tilemap('level1', '../../images/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level2', '../../images/level2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', '../../images/tiles.png');
    this.load.image('tiles2', '../../images/tiles2.png');
    this.load.image('player', '../../images/stockman.png');
    this.load.image('script', '../../images/script.png');
    this.load.spritesheet('ms', '../../images/mummy.png', 37, 45, 18);
    this.load.image('city', '../../images/city.jpg');
    this.load.spritesheet('main-button', '../../images/spilaleik.png',193, 70);
    this.load.spritesheet('score-button', '../../images/stig.png',193, 70);
    this.load.spritesheet('back-button', '../../images/tilbaka.png',193, 70);
		this.load.image('background', '../../images/menuBackground.png');
    this.load.image('button', '../../images/button_blue.png', 200, 50);
    this.load.spritesheet('rundog', '../../images/runnDog.png', 78, 55, 22);
    this.load.spritesheet('items', '../../images/tiles.png', 32, 32);

	},
	//when preload finishes start game state (Game.js)
	create: function () {

		this.state.start('MainMenu');

	}

};