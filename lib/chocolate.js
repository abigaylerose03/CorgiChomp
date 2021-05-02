const FallingObject = require("./falling_object");

class Chocolate extends FallingObject {
  constructor(options = {}) {
    options.good = false;
    options.src = "assets/heart.png";
    super(options);
  }
}

module.exports = Chocolate;
