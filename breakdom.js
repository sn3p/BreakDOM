(function() {
  var dom = {};
  dom.container = $("#container");
  dom.counter = $('<div id="counter" />').appendTo(dom.container);
  dom.paddle = $('<div id="paddle" />').appendTo(dom.container);
  dom.paddler = $('<div id="paddler" />').appendTo(dom.paddle);
  dom.enemies = $('<div id="enemies" />').appendTo(dom.container);
  dom.player = $('<div id="player" />').appendTo(dom.container);

  var key = {
    leftDown: false,
    rightDown: false
  };

  var width = dom.container.width(),
    height = dom.container.height(),
    enemies = [],
    player = null,
    playing = false,
    playerWidth = 14,
    playerHeight = 14,
    enemyWidth = 15,
    enemyHeight = 15,
    enemySpacing = 3,
    columns = Math.floor(width / (enemyWidth + enemySpacing)),
    rows = Math.floor((height / (enemyHeight + enemySpacing)) * 0.3),
    paddleFactor = 0.25,
    paddleWidth = 0.25 * width,
    scrollX = 0;

  function reset() {
    dom.enemies.empty();
    dom.player.empty();

    enemies = [];
    playing = false;
    player = null;

    dom.counter.text("");

    createEnemies();
    createPaddle();
    createPlayer();

    window.addEventListener("mousemove", mouseMoveHandler, false);
    window.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("keyup", keyUpHandler, false);

    update();
  }

  function createEnemies() {
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        var type = Math.random() > 0.5 ? "radio" : "checkbox";
        var element = $('<input type="' + type + '" checked>').appendTo(
          dom.enemies
        );

        element.css({
          position: "absolute",
          left: enemySpacing + j * (enemyWidth + enemySpacing),
          top: enemySpacing + i * (enemyHeight + enemySpacing)
        });

        enemies.push(new Enemy(element));
      }
    }
  }

  function createPaddle() {
    var pw = width;

    if (navigator.appVersion.match(/Mac/gi)) {
      pw += 28;
    } else if (navigator.appVersion.match(/Win/gi)) {
      pw += 40;
      dom.paddle.css("left", -20);
    }

    dom.paddle.width(pw);
    dom.paddler.width((1 / paddleFactor) * width);
  }

  function createPlayer() {
    player = new Player(dom.player);
    player.move(width * 0.2 + Math.random() * (width * 0.6), height - 50);

    $('<input type="radio" checked>').appendTo(dom.player);
  }

  function mouseMoveHandler(event) {
    scrollX = Math.max(
      Math.min((event.clientX - dom.container.offset().left) / width, 1),
      0
    );
  }

  function keyDownHandler(event) {
    switch (event.keyCode) {
      case 37:
        key.leftDown = true;
        event.preventDefault();
        break;
      case 39:
        key.rightDown = true;
        event.preventDefault();
        break;
    }
  }
  function keyUpHandler(event) {
    switch (event.keyCode) {
      case 37:
        key.leftDown = false;
        event.preventDefault();
        break;
      case 39:
        key.rightDown = false;
        event.preventDefault();
        break;
    }
  }

  function startGame() {
    playing = true;

    player.velocity.y = -5;
    player.velocity.x = Math.random() > 0.5 ? -4 : 4;
  }

  function update() {
    if (key.leftDown) scrollX = Math.max(scrollX - 0.02, paddleFactor / 2);
    if (key.rightDown) scrollX = Math.min(scrollX + 0.02, 1 - paddleFactor / 2);

    var playerPosition = player.position();

    if (playerPosition.x < 0) {
      player.velocity.x = Math.abs(player.velocity.x);
    } else if (playerPosition.x + playerWidth > width) {
      player.velocity.x = -Math.abs(player.velocity.x);
    }

    if (playerPosition.y < 0) {
      player.velocity.y = Math.abs(player.velocity.y);
    } else if (playerPosition.y > height - 35) {
      if (playerPosition.y < height) {
        var paddleStartX = Math.max(
          Math.min(scrollX * width - paddleWidth / 2, width - paddleWidth),
          0
        );
        var paddleEndX = paddleStartX + paddleWidth;

        if (
          playerPosition.x + playerWidth >= paddleStartX &&
          playerPosition.x <= paddleEndX
        ) {
          player.velocity.x =
            10 *
            ((playerPosition.x - paddleStartX) / (paddleEndX - paddleStartX) -
              0.5);
          player.velocity.y = -Math.abs(player.velocity.y);

          player.step();
        }
      } else {
        reset();
        startGame();
        return;
      }
    }

    player.step();

    var i = enemies.length;

    var updateCount = false;
    var enemyCount = 0;

    while (i--) {
      var enemy = enemies[i];
      var enemyPosition = enemy.position();

      if (enemy.falling) {
        enemy.step();

        if (enemyPosition.y > height) {
          enemies.splice(i, 1);
        }
      } else {
        if (
          playerPosition.x + playerWidth > enemyPosition.x &&
          playerPosition.x < enemyPosition.x + enemyWidth &&
          playerPosition.y + playerHeight > enemyPosition.y &&
          playerPosition.y < enemyPosition.y + enemyHeight
        ) {
          updateCount = true;

          enemy.fall();

          if (playerPosition.y < enemyPosition.y + enemyWidth * 0.5) {
            player.velocity.y = -Math.abs(player.velocity.y);
          } else {
            player.velocity.y = Math.abs(player.velocity.y);
          }

          if (playerPosition.x < enemyPosition.x + enemyHeight * 0.5) {
            player.velocity.x = -Math.abs(player.velocity.x);
          } else {
            player.velocity.x = Math.abs(player.velocity.x);
          }
        } else {
          enemyCount++;
        }
      }
    }

    if (updateCount) {
      dom.counter
        .stop(true, true)
        .fadeTo(50, 0.4)
        .fadeTo(900, 0.1);
      dom.counter.text(enemyCount);
    }

    if (enemies.length === 0) {
      alert(
        "Omg omg! You won! Totally deserve a prize, but I don't have one :'("
      );

      reset();
      startGame();
      return;
    }

    dom.paddle.scrollLeft(scrollX * dom.paddler.width() - paddleWidth * 2);

    setTimeout(update, 16);
  }

  function Enemy(element, vx, vy) {
    this.element = element;
    this.velocity = { x: vx || 0, y: vy || 0 };
    this.rotation = 0;
    this.cachedPosition = {
      x: this.element.position().left,
      y: this.element.position().top
    };
    this.falling = false;

    this.step = function() {
      var x = this.position().x + this.velocity.x;
      var y = this.position().y + this.velocity.y;

      this.element.css({
        left: x,
        top: y
      });

      this.velocity.x *= 0.98;
      this.velocity.y *= 1.02;

      this.cachedPosition = { x: x, y: y };
    };

    this.fall = function() {
      this.falling = true;

      this.element.removeAttr("checked");

      this.velocity.x = -2 + Math.random() * 4;
      this.velocity.y = 2 + Math.random() * 4;
    };

    this.position = function() {
      return this.cachedPosition;
    };
  }

  function Player(element, vx, vy) {
    this.element = element;
    this.velocity = { x: vx || 0, y: vy || 0 };

    this.step = function() {
      this.move(
        this.element.position().left + this.velocity.x,
        this.element.position().top + this.velocity.y
      );
    };

    this.move = function(x, y) {
      this.element.css({
        left: x,
        top: y
      });
    };

    this.position = function() {
      return {
        x: this.element.position().left,
        y: this.element.position().top
      };
    };
  }

  reset();
  startGame();
})();
