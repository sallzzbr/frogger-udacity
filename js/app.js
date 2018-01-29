// Enemies our player must avoid
var Enemy = function(start, row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
//This will set the position based on the function enemy getting called on the array allEnemies ahead
    this.x = start;
    this.y = row;
//This will set the speed to a random number that will be minimum 100
    this.speed = Math.floor((Math.random() * 200) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  if (this.x <= 550){
    this.x += this.speed * dt;
  } else {
    this.x = randomStart();
    this.y = randomRow();
  }
  // if (player.x >= this.x - 70  && player.x <= this.x + 70
  //   && player.y >= this.y - 70 && player.y <= this.y + 70) {
  // this.reset();
  // }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (URL) {
  this.sprite = URL || '';
  this.x = 202.5;
  this.y = 380;
  this.points = 0;
}

//Update player position
Player.prototype.update = function(){
    //if left key is pressed and player is not on edge of map, pressed decrement x
    if(this.ctlKey === 'left' && this.x > 2.5){
        this.x = this.x - 100;
    //if right key is pressed and player is not on edge of map increment x
  }else if(this.ctlKey === 'right' && this.x != 402.5){
        this.x = this.x + 100;
    //if up key is pressed increment y
    }else if(this.ctlKey === 'up'){
        this.y = this.y - 80;
    //if down key is pressed and player is not on edge of map decrement y
  }else if (this.ctlKey === 'down' && this.y != 380){
        this.y = this.y + 80;
    }
    this.ctlKey = null;

    //If on water, reset
    // if(this.y < 25){
    //     this.reset();
    // }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Input handler for player
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
}

Object.prototype.reset = function() {
    player.x = 202.5;
    player.y = 380;
    this.score = 0;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 6; i++) {
  var row = randomRow();
  var start = randomStart();
  // console.log(random_row)
  // console.log(row[random_row])
  allEnemies[i] = new Enemy(start, row);
}

function randomRow(){
  var random_row = Math.floor(getRandomIntInclusive(0, 2));
  var row = [60, 140, 220];
  return row[random_row];
}

function randomX(){
  var random_row = Math.floor(getRandomIntInclusive(0, 4));
  var row = [55, 165, 275, 385, 495];
  return row[random_row];
}

function randomStart(){
  var random_start = Math.floor(getRandomIntInclusive(0, 2));
  var start = [-25, -100, -210];
  return start[random_start];
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    selector.handleInput(allowedKeys[e.keyCode]);
});

var Selector = function () {
    this.sprite = 'images/Star.png';

    this.x = 0;
    this.y = 202;
}

Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Selector.prototype.update = function() {
    if (this.x <= 0) {
        this.x = 0;
    }
    if (this.x >= 404) {
        this.x = 404;
    }
    if (this.y >= 404) {
        this.y = 404;
    };
}

Selector.prototype.handleInput = function(key) {
    var direction = {
        'left': [-101, 0],
        'up': [0, -85.5],
        'right': [101, 0],
        'down': [0, 85.5],
        'enter': [0,0]
    };

    this.x += direction[key][0];
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var selector = new Selector();

var Gems = function () {
    var sprites = [
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png'
    ];

    this.value = Math.floor(Math.random() * 3)
    this.sprite = sprites[this.value];
    this.multiplier = 5 * (this.value + 1);

    this.x = randomX();
    this.y = randomRow();
}

Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
