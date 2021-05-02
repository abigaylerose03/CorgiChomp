const FallingObject = require("./falling_object");

class Bone extends FallingObject {
  constructor(options = {}) {
    options.good = true;
    options.src = "assets/sword.png";
    super(options);
  }
}

module.exports = Bone;
