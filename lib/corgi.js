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
