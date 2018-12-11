import "../main.css";
import Enemy from "./Enemy";
import Player from "./Player";

class BreakDOM {
  constructor() {
    this.dom = {};
    this.dom.container = $("#breakdom");
    this.dom.counter = $('<div id="counter" />').appendTo(this.dom.container);
    this.dom.paddle = $('<div id="paddle" />').appendTo(this.dom.container);
    this.dom.paddler = $('<div id="paddler" />').appendTo(this.dom.paddle);
    this.dom.enemies = $('<div id="enemies" />').appendTo(this.dom.container);
    this.dom.player = $('<div id="player" />').appendTo(this.dom.container);

    this.key = {
      leftDown: false,
      rightDown: false
    };

    this.width = this.dom.container.width();
    this.height = this.dom.container.height();
    this.enemies = [];
    this.player = null;
    this.playing = false;
    this.playerWidth = 14;
    this.playerHeight = 14;
    this.enemyWidth = 15;
    this.enemyHeight = 15;
    this.enemySpacing = 3;
    this.columns = Math.floor(
      this.width / (this.enemyWidth + this.enemySpacing)
    );
    this.rows = Math.floor(
      (this.height / (this.enemyHeight + this.enemySpacing)) * 0.3
    );
    this.paddleFactor = 0.25;
    this.paddleWidth = 0.25 * this.width;
    this.scrollX = 0;

    window.addEventListener("mousemove", this.mouseMoveHandler, false);
    window.addEventListener("keydown", this.keyDownHandler, false);
    window.addEventListener("keyup", this.keyUpHandler, false);
  }

  reset() {
    this.dom.enemies.empty();
    this.dom.player.empty();

    this.enemies = [];
    this.playing = false;
    this.player = null;

    this.dom.counter.text("");

    this.createEnemies();
    this.createPaddle();
    this.createPlayer();

    this.update();
  }

  createEnemies() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const type = Math.random() > 0.5 ? "radio" : "checkbox";
        const element = $('<input type="' + type + '" checked>').appendTo(
          this.dom.enemies
        );

        element.css({
          position: "absolute",
          left: this.enemySpacing + j * (this.enemyWidth + this.enemySpacing),
          top: this.enemySpacing + i * (this.enemyHeight + this.enemySpacing)
        });

        this.enemies.push(new Enemy(element));
      }
    }
  }

  createPaddle() {
    this.dom.paddler.width((1 / this.paddleFactor) * this.width);
  }

  createPlayer() {
    this.player = new Player(this.dom.player);
    this.player.move(
      this.width * 0.2 + Math.random() * (this.width * 0.6),
      this.height - 50
    );

    $('<input type="radio" checked>').appendTo(this.dom.player);
  }

  mouseMoveHandler = event => {
    this.scrollX = Math.max(
      Math.min(
        (event.clientX - this.dom.container.offset().left) / this.width,
        1
      ),
      0
    );
  };

  keyDownHandler = event => {
    switch (event.keyCode) {
      case 37:
        this.key.leftDown = true;
        event.preventDefault();
        break;
      case 39:
        this.key.rightDown = true;
        event.preventDefault();
        break;
    }
  };
  keyUpHandler = event => {
    switch (event.keyCode) {
      case 37:
        this.key.leftDown = false;
        event.preventDefault();
        break;
      case 39:
        this.key.rightDown = false;
        event.preventDefault();
        break;
    }
  };

  start() {
    this.reset();

    this.playing = true;
    this.player.velocity.y = -5;
    this.player.velocity.x = Math.random() > 0.5 ? -4 : 4;
  }

  update = () => {
    if (this.key.leftDown)
      this.scrollX = Math.max(this.scrollX - 0.02, this.paddleFactor / 2);
    if (this.key.rightDown)
      this.scrollX = Math.min(this.scrollX + 0.02, 1 - this.paddleFactor / 2);

    const playerPosition = this.player.position();

    if (playerPosition.x < 0) {
      this.player.velocity.x = Math.abs(this.player.velocity.x);
    } else if (playerPosition.x + this.playerWidth > this.width) {
      this.player.velocity.x = -Math.abs(this.player.velocity.x);
    }

    if (playerPosition.y < 0) {
      this.player.velocity.y = Math.abs(this.player.velocity.y);
    } else if (playerPosition.y > this.height - 35) {
      if (playerPosition.y < this.height) {
        const paddleStartX = Math.max(
          Math.min(
            this.scrollX * this.width - this.paddleWidth / 2,
            this.width - this.paddleWidth
          ),
          0
        );
        const paddleEndX = paddleStartX + this.paddleWidth;

        if (
          playerPosition.x + this.playerWidth >= paddleStartX &&
          playerPosition.x <= paddleEndX
        ) {
          this.player.velocity.x =
            10 *
            ((playerPosition.x - paddleStartX) / (paddleEndX - paddleStartX) -
              0.5);
          this.player.velocity.y = -Math.abs(this.player.velocity.y);

          this.player.step();
        }
      } else {
        this.start();
        return;
      }
    }

    this.player.step();

    let i = this.enemies.length;
    let updateCount = false;
    let enemyCount = 0;

    while (i--) {
      const enemy = this.enemies[i];
      const enemyPosition = enemy.position();

      if (enemy.falling) {
        enemy.step();

        if (enemyPosition.y > this.height) {
          this.enemies.splice(i, 1);
        }
      } else {
        if (
          playerPosition.x + this.playerWidth > enemyPosition.x &&
          playerPosition.x < enemyPosition.x + this.enemyWidth &&
          playerPosition.y + this.playerHeight > enemyPosition.y &&
          playerPosition.y < enemyPosition.y + this.enemyHeight
        ) {
          updateCount = true;

          enemy.fall();

          if (playerPosition.y < enemyPosition.y + this.enemyWidth * 0.5) {
            this.player.velocity.y = -Math.abs(this.player.velocity.y);
          } else {
            this.player.velocity.y = Math.abs(this.player.velocity.y);
          }

          if (playerPosition.x < enemyPosition.x + this.enemyHeight * 0.5) {
            this.player.velocity.x = -Math.abs(this.player.velocity.x);
          } else {
            this.player.velocity.x = Math.abs(this.player.velocity.x);
          }
        } else {
          enemyCount++;
        }
      }
    }

    if (updateCount) {
      this.dom.counter
        .stop(true, true)
        .fadeTo(50, 0.4)
        .fadeTo(900, 0.1);
      this.dom.counter.text(enemyCount);
    }

    if (this.enemies.length === 0) {
      alert(
        "Omg omg! You won! Totally deserve a prize, but I don't have one :'("
      );

      this.start();
      return;
    }

    this.dom.paddle.scrollLeft(
      this.scrollX * this.dom.paddler.width() - this.paddleWidth * 2
    );

    setTimeout(this.update, 16);
  };
}

export default BreakDOM;
