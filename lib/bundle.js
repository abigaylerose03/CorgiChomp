/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(6);
	
	document.addEventListener("DOMContentLoaded", () => {
	  const canvas = document.getElementById("canvas");
	  canvas.width = Game.DIM_X;
	  canvas.height = Game.DIM_Y;
	
	  const ctx = canvas.getContext("2d");
	  new GameView(ctx).welcome();
	});
	
	
	// ## want to create new game view, render welcome message on game view first
	// ## welcome message, wait for user to press space to start game
	// ## on start, gameview.start (to create new game)
	// ## on gameover, render gameover message and on reset, replace with new game
	//     and invoke GameView.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Corgi = __webpack_require__(2);
	const Bone = __webpack_require__(3);
	const Chocolate = __webpack_require__(5);
	
	class Game {
	  constructor(ctx) {
	    this.ctx = ctx;
	    this.score = 0;
	    this.lives = 3;
	    this.bones = [];
	    this.chocolates = [];
	    this.difficulty = 2;
	    this.corgi = new Corgi();
	  }
	
	  draw(ctx) {
	    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	    this.corgi.draw(ctx);
	    this.checkCollisions();
	    this.drawScore(this.ctx);
	    this.drawLives(this.ctx);
	    this.checkGameOver(this.ctx);
	  }
	
	  drawScore(ctx) {
	    ctx.font='20px Raleway';
	    ctx.fillStyle = "white";
	    ctx.fillText("SCORE: " + this.score, 10,30);
	  }
	
	  drawLives(ctx) {
	    ctx.font='20px Raleway';
	    ctx.fillStyle = "white";
	    ctx.fillText("LIVES: " + this.lives, 315,30);
	  }
	
	  drawGameOver(ctx) {
	    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	    ctx.font='25px Raleway';
	    ctx.fillStyle = "black";
	    ctx.fillText("GAME OVER", 125, 160);
	    ctx.fillText("YOUR SCORE: " + this.score, 110, 200);
	    ctx.fillText("Press SPACE to restart!", 70, 240);
	    this.clearAllIntervals();
	  }
	
	  checkGameOver(ctx) {
	    if (this.lives == 0) {
	      this.drawGameOver(ctx);
	    }
	  }
	
	  checkCollisions() {
	    this.bones.forEach((bone) => {
	      if (bone.collidesWith(this.corgi)) {
	        this.score++;
	        this.remove(bone);
	      }
	      this.increaseDifficulty(bone);
	      bone.update(this.ctx);
	    });
	    this.chocolates.forEach(chocolate => {
	      if (chocolate.collidesWith(this.corgi)) {
	        this.lives--;
	        this.remove(chocolate);
	      }
	      this.increaseDifficulty(chocolate);
	      chocolate.update(this.ctx);
	    });
	  }
	
	  startInterval() {
	    setInterval(() => this.bones.push(new Bone()), 2000);
	    setInterval(() => this.chocolates.push(new Chocolate()), 5500);
	  }
	
	  clearAllIntervals() {
	    for (var i = 1; i < 99999; i++) {
	      window.clearInterval(i);
	    }
	  }
	
	  remove(object) {
	    if (object instanceof Bone) {
	      this.bones.splice(this.bones.indexOf(object), 1);
	    } else if (object instanceof Chocolate) {
	      this.chocolates.splice(this.chocolates.indexOf(object), 1);
	    }
	  }
	
	  increaseDifficulty(object) {
	    if (this.score >= 5 && this.score < 10) {
	      this.difficulty = 3;
	      object.dy = this.difficulty;
	    } else if (this.score >= 10 && this.score < 20) {
	      this.difficulty = 4;
	      object.dy = this.difficulty;
	    } else if (this.score >= 20) {
	      this.difficulty = 5;
	      object.dy = this.difficulty;
	    }
	  }
	}
	
	Game.DIM_X = 400;
	Game.DIM_Y = 500;
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Corgi {
	  constructor() {
	    this.x = 170;
	    this.y = 450;
	    this.width = 60;
	    this.height = 45;
	    this.image = new Image();
	    this.image.src = "assets/son.png";
	  }
	
	  updatePos(left) {
	    if (left && this.x > 0) {
	      this.x -= 20;
	    } else if (!left && this.x < 340){
	      this.x += 20;
	    }
	  }
	
	  draw(ctx) {
	    ctx.drawImage(this.image, this.x, this.y);
	  }
	
	}
	
	module.exports = Corgi;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const FallingObject = __webpack_require__(4);
	
	class Bone extends FallingObject {
	  constructor(options = {}) {
	    options.good = true;
	    options.src = "assets/heart.png";
	    super(options);
	  }
	}
	
	module.exports = Bone;


/***/ },
/* 4 */
/***/ function(module, exports) {

	class FallingObject {
	  constructor(options) {
	    this.x = (Math.floor(370 * Math.random()));
	    this.y = 0;
	    this.width = 30;
	    this.height = 30;
	    this.dy = 2;
	    this.good = options.good;
	    this.image = new Image();
	    this.image.src = options.src;
	  }
	
	  update(ctx) {
	    this.y += this.dy;
	    this.draw(ctx);
	  }
	
	  draw(ctx) {
	    ctx.drawImage(this.image, this.x, this.y);
	  }
	
	  collidesWith(otherObject) {
	    return (((this.x + this.width/2) > otherObject.x && (this.x < (otherObject.x + otherObject.width))) && ((this.y + this.height) > otherObject.y && (this.y < (otherObject.y + otherObject.height))));
	  }
	}
	
	module.exports = FallingObject;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const FallingObject = __webpack_require__(4);
	
	class Chocolate extends FallingObject {
	  constructor(options = {}) {
	    options.good = false;
	    options.src = "assets/sword.png";
	    super(options);
	  }
	}
	
	module.exports = Chocolate;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	class GameView {
	  constructor(ctx) {
	    this.ctx = ctx;
	  }
	
	  bindKeyHandlers() {
	    const corgi = this.corgi;
	    Object.keys(GameView.MOVES).forEach((k) => {
	      let move = GameView.MOVES[k] === -20;
	      key(k, () => corgi.updatePos(move));
	    });
	  }
	
	  welcome() {
	    this.drawWelcome(this.ctx);
	    const that = this;
	    $(window).keypress(function(e) {
	      if (e.keyCode == 32) {
	        that.start();
	      }
	    });
	  }
	
	  drawWelcome(ctx) {
	    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	    ctx.font='20px Arial';
	    ctx.fillStyle = "black";
	    ctx.fillText("Press SPACE to start!", 100, 200);
	  }
	
	  start() {
	    this.game = new Game(this.ctx);
	    this.corgi = this.game.corgi;
	    this.bindKeyHandlers();
	    this.game.startInterval();
	    this.lastTime = 0;
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	  animate(time) {
	    const timeDelta = time - this.lastTime;
	    this.game.draw(this.ctx);
	    this.lastTime = time;
	    requestAnimationFrame(this.animate.bind(this));
	  }
	}
	
	GameView.MOVES = {
	  "left": -20,
	  "right": 20
	};
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map