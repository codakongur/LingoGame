'use strict'
//Object constructor for player
//creates object of type Phaser.sprite
Lingo.Player = function (game, x, y) {
	this.playerFacing = 'right';
	Phaser.Sprite.call(this, game, x, y, 'rundog');
  this.anchor.set(0.5);
  this.life = 3;
  this.lifeTimer = 0;
  this.game = game;

  this.physics = game.physics.arcade;

  this.physics.enable(this);
  this.enableBody = true;
  this.body.tilePadding.set(32);
  this.body.collideWorldBounds = true;
  this.body.gravity.y = 1000;
  this.body.setSize(54, 32, 12, 20);

  this.animations.add('right',[0,1,2,3,4,5,6,7], 12, true);
  this.animations.add('left',[15,14,13,12,11,10,9,8], 12, true);
  this.animations.add('sit',[16,17,18,19,20], 12, true);

  this.tounges1 = new Phaser.Sprite(game, 760, 12, 'items', 43),
  this.tounges2 = new Phaser.Sprite(game, 720, 12, 'items', 43);

  this.tounges1.fixedToCamera = true;
  this.tounges2.fixedToCamera = true;
}
Lingo.Player.prototype = Object.create(Phaser.Sprite.prototype);
Lingo.Player.prototype.constructor = Lingo.Player;
//update loop called automaticly by Phaser.game
//state restarts when player
Lingo.Player.prototype.update = function () {
  //state (level) restarts when player hits bottom of level
  if(this.body.y > this.game.world.height - 40){
    this.game.state.restart();
  }

}
Lingo.Player.prototype.moveRight = function(deltaTime) {
		this.body.x += (200 * deltaTime);
    this.animations.play('right');
    this.playerFacing = 'right';
}
Lingo.Player.prototype.moveLeft = function(deltaTime){
		this.body.x += (-200 * deltaTime);
    this.animations.play('left');
		this.playerFacing = 'left';
}
//resets player to original spawn
Lingo.Player.prototype.restart = function(){
		this.body.x =250;
		this.body.y = 2800;
    this.life = 2;
}
Lingo.Player.prototype.looseLife = function(timeNow){
    var tempBool = false;
    if(timeNow == undefined){tempBool = true};
    if(this.lifeTimer < timeNow || tempBool){

      if(timeNow !== undefined){
        this.lifeTimer = timeNow + 1000; 
      }

      this.body.velocity.y = -200;
      this.life -= 1;
      
      if(this.life === 2){
        this.tounges2.kill();        
      }else if(this.life === 1){
        this.tounges1.kill();
      }else if(this.life <= 0){
        this.game.state.restart();
      }
    }
}
//goes to next level and updates database for user
Lingo.Player.prototype.nextlevel = function(gameFinished, timeNow){
    if(this.lifeTimer < timeNow){
      this.lifeTimer = timeNow + 1000;
      if(gameFinished){
        $.ajax({
            type: 'POST',
            url: '/updateLevel',
            data: {toIncrement: 0},
            async: false,
            success: function(){
            }
          });
        this.game.state.start('MainMenu');
      }else{
        $.ajax({
          type: 'POST',
          url: '/updateLevel',
          data: {toIncrement: 1},
          async: false,
          success: function(){
          }
        });
        this.game.state.start('Level2');
      }
    }
}