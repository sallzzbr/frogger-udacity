# Playing the game

Download or Clone the repository to your computer.

```
https://github.com/sallzzbr/frogger-udacity.git
```

 Just click on index.html and have fun!

# Frogger

The game goal is to cross the road to the river while avoiding getting hit by the bugs. You can collect gems for extra points. The player has three hearts of HP.

# Files

* `js/app.js` Contains the entities of the game
* `js/engine.js` game engine provided by Udacity
* `js/resources.js` has utility classes. Also provided by Udacity
* `css/style.css` project CSS
* `index.html` HTML for running the game

## app.js

### Enemy

The enemy function receives two parameters that will randomly define its start.
```
var Enemy = function(start, row) {
    this.sprite = 'images/enemy-bug.png';
    this.x = start;
    this.y = row;
    this.speed = Math.floor((Math.random() * 200) + 100);
};
```
The enemy update function ensure the game runs on the same speed on all computers, also I am using it to keep the enemies respawning.
```
Enemy.prototype.update = function(dt) {
     for
  if (this.x <= 550){
    this.x += this.speed * dt;
  } else {
    this.x = randomStart();
    this.y = randomRow();
  }
};
```
This array instantiate all enemy objects, it also call the functions that randomize where they will start
```
var allEnemies = [];
for (var i = 0; i < 6; i++) {
  var row = randomRow();
  var start = randomStart();
  allEnemies[i] = new Enemy(start, row);
}
```

### Player
The player function will receive the image that will be selected on the select screen. It also create and manage points for the player and set its initial position.
```
var Player = function (URL) {
  this.sprite = URL || '';
  this.x = 202.5;
  this.y = 380;
  this.points = 0;
}
```
The player update controls the player movements.
```
Player.prototype.update = function(){
  if(this.ctlKey === 'left' && this.x > 2.5){
    this.x = this.x - 100;
  } else if(this.ctlKey === 'right' && this.x != 402.5){
    this.x = this.x + 100;
  } else if(this.ctlKey === 'up'){
    this.y = this.y - 80;
    map decrement y
  }else if (this.ctlKey === 'down' && this.y != 380){
    this.y = this.y + 80;
  }
    this.ctlKey = null;
  }
```
This function will be called (on engine.js) to the reset the player position in case of collisions.
```
Object.prototype.reset = function() {
    player.x = 202.5;
    player.y = 380;
    this.score = 0;
}
```

### Gems
This function create the gems for the game. It has an array of arrays, where is set the the gem color and value. It will be radomized when the gem is instantiated.
```
var Gems = function () {

    var types = [
        ['images/Gem Blue.png', 5],
        ['images/Gem Green.png', 10],
        ['images/Gem Orange.png', 15]
    ];

    this.value = Math.floor(getRandomIntInclusive(0, 2))
    this.sprite = types[this.value][0];
    this.bonus = types[this.value][1];
    this.x = randomX();
    this.y = randomRow();

    console.log(types[this.value][0]);
    console.log(types[this.value][1]);
}
```
This function will make the Gems get reinstantiated every 4.5 seconds (4500 ms).
```
function movingGems(){
  gems = new Gems();
}
setInterval(movingGems, 4500);
```

### Selector
This function creates the selector, defining its position and sprite.
```
var Selector = function () {
    this.sprite = 'images/Star.png';
    this.x = 0;
    this.y = 202;
}
```
This function defines the controls for the selector.
```
Selector.prototype.handleInput = function(key) {
    var direction = {
        'left': [-101, 0],
        'up': [0, -85.5],
        'right': [101, 0],
        'down': [0, 85.5]
    };
    this.x += direction[key][0];
}
```

### Functions
This is a function to randomize one of thr three road rows.
```
function randomRow(){
  var random_row = Math.floor(getRandomIntInclusive(0, 2));
  var row = [60, 140, 220];
  return row[random_row];
}
```
This is a function to ramdomize one of the vertical squares.
```
function randomX(){
  var random_row = Math.floor(getRandomIntInclusive(0, 4));
  var row = [0, 100, 200, 300, 400];
  return row[random_row];
}
```
This function will define where the enemy will start.
```
function randomStart(){
  var random_start = Math.floor(getRandomIntInclusive(0, 2));
  var start = [-25, -100, -210];
  return start[random_start];
}
```
this is a function to randomize things.
```
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

## engine.js

### Global Variables

Declared inside Engine(), the variables gameState, playerSprite and playerLife need to be global in order to affect the whole game.

```
var doc = global.document,
    win = global.window,
    canvas = doc.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    gameState = "selection",
    playerSprite = '',
    playerLife = 3,
    lastTime;
```

### Update()
Based on the gameState this function will show different things on the screen.
```
function update(dt) {
  if(gameState == "running"){
    updateEntities(dt);
    checkCollisions();
  } else {
    selector.update();
  }
}
```
### checkCollisions()
This function will check player collision with different objects and give different answers based on that. Like reduce playerLife, give him points etc.
```
function checkCollisions() {
  allEnemies.forEach(function (enemy) {
    if ((enemy.y === player.y) && (player.x >= (enemy.x - 50)) && (player.x <= (enemy.x + 80))) {
      this.reset();
      playerLife -= 1;
      if (playerLife == 0){
        console.log("teste");
        gameState = "gameover";
        playerLife = 3;
      }
    } else if(player.y < 25){
      player.points += 1;
      this.reset();
      gems = new Gems();
    } else if ((gems.y === player.y) && (player.x >= (gems.x - 50)) && (player.x <= (gems.x + 80))) {
      player.points += gems.bonus;
      gems = new Gems();
    }
  });
}
```

### render()
inside the render function, this snippet of text will render different parts of the game according to its state.
```
if (gameState == "selection") {
    renderPlayerSelect();
} else if (gameState == "gameover") {
    renderGameOver();
} else {
renderEntities();
playerHP();
```

### playerHP
Based on playerLife this function will show the hearts on the screen.
```
function playerHP(){
  for(i = 0; i < playerLife; i++){
    ctx.drawImage(Resources.get('images/Heart.png'), i * 45, 30, 50, 86);
  }
}
```

### renderPlayerSelect()
WIth an array of arrays this function will render the player select. The player sprite will be selected baed on the position the selector is when "space" is pressed.

**options[i][0] will get the location while [i][1] will get the sprite**
```
function renderPlayerSelect() {
    var options = [
        [0, 'images/char-cat-girl.png'],
        [101, 'images/char-horn-girl.png'],
        [202, 'images/char-pink-girl.png'],
        [303, 'images/char-boy.png'],
        [404, 'images/char-princess-girl.png']
    ];

    selector.render();

    for (i = 0; i < options.length; i++) {
        ctx.drawImage(Resources.get(options[i][1]), options[i][0], 303);

        if (options[i][0] === selector.x) {
            playerSprite = options[i][1];
        }
    }

    ctx.font="36px Impact";
    // Create gradient
    var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");
    // Fill with gradient
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.fillText("Choose your characther", 80, 480);
    ctx.strokeStyle=gradient;
    ctx.lineWidth = 2;
    ctx.strokeText("Choose your characther", 80, 480);

}
```

### Reset()
This function is also part of the reset of the game
```
function reset() {
   allEnemies = [];
   for (i = 0; i < 3; i++) {
       allEnemies[i] = new Enemy();
   }
   player = new Player(playerSprite);

   gems = new Gems();
}
```
### Game over
This function will render the game over screens in different scenarios.
```
function renderGameOver() {

  if(player.points == 0){
     ctx.rect(0, 0, canvas.width, canvas.height);
     ctx.fillStyle = "black";
     ctx.fill();
     ctx.font="98px Impact";
     ctx.fillStyle = "rgb(77, 0, 0)";
     ctx.fillText("YOU DIED", 90, 220);
     gameOverText("Frogger Souls", 170, 330, "Press SPACE to restart", 95, 370, false)
   } else if ( player.points > 0 && player.points < 500) {
       gameOverMessage("GG", 201.5, 190, 98);
       gameOverText("GIT GUD", 190, 300, "Press SPACE to restart", 95, 340, true)
   } else {
       gameOverMessage("CONGRATULATIONS", 15, 220, 62)
       gameOverText("You are awesome!", 125, 300, "Press SPACE to restart", 95, 340, true)
   }
 }
 ```
### Functions

![](https://img00.deviantart.net/e5de/i/2013/026/e/a/vaas___insanity__far_cry_3__by_aeroxhd-d5rheoq.png)
In order to avoid code repetition and take lot of space etc, I've made this functions to render the game over messages :) I am proud of myself o/
```
function gameOverMessage(message, x, y, fontSize){
  ctx.font= fontSize + "px Impact";
  var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
  gradient.addColorStop("0","magenta");
  gradient.addColorStop("0.5","blue");
  gradient.addColorStop("1.0","red");
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.fillText(message, x, y);
  ctx.strokeStyle=gradient;
  ctx.lineWidth = 2;
  ctx.strokeText(message, x, y);
}

function gameOverText(topText, topX, topY, bottomText, botX, botY, stroke){
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "32px Helvetica";
  ctx.fillText(topText, topX, topY);
  ctx.fillText(bottomText, botX, botY);
  if (stroke == true){
    ctx.strokeText(topText, topX, topY);
    ctx.strokeText(bottomText, botX, botY);
  }
}
```

### addEventListener
Will take care of the game state
```
document.addEventListener('keyup', function(e) {
    if (gameState == "selection"  && (e.keyCode < 37 || e.keyCode > 40)) {
        reset();
        gameState = "running";
    } else if (gameState == "gameover") {
        if (e.keyCode == 32) {
            gameState = "selection";
            player.points = 0;
        }
    }
});
```
## Other parts

I didn't change anything in other documents. I hope in the future to have time to divide all this code in separate documents.

regards and thx,
