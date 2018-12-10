class Player {
  constructor(element, vx, vy) {
    this.element = element;
    this.velocity = {
      x: vx || 0,
      y: vy || 0
    };
  }

  step() {
    this.move(
      this.element.position().left + this.velocity.x,
      this.element.position().top + this.velocity.y
    );
  }

  move(x, y) {
    this.element.css({
      left: x,
      top: y
    });
  }

  position() {
    return {
      x: this.element.position().left,
      y: this.element.position().top
    };
  }
}

export default Player;
