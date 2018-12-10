class Enemy {
  constructor(element, vx, vy) {
    this.element = element;
    this.velocity = {
      x: vx || 0,
      y: vy || 0
    };
    this.rotation = 0;
    this.cachedPosition = {
      x: this.element.position().left,
      y: this.element.position().top
    };
    this.falling = false;
  }

  step() {
    const x = this.position().x + this.velocity.x;
    const y = this.position().y + this.velocity.y;

    this.element.css({ left: x, top: y });

    this.velocity.x *= 0.98;
    this.velocity.y *= 1.02;

    this.cachedPosition = { x: x, y: y };
  }

  fall() {
    this.falling = true;

    this.element.removeAttr("checked");

    this.velocity.x = -2 + Math.random() * 4;
    this.velocity.y = 2 + Math.random() * 4;
  }

  position() {
    return this.cachedPosition;
  }
}

export default Enemy;
