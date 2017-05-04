var symbols = [];
var symbolSize = 16;

// you always need a setup function in p5.js
// this is the initial setup that gets applied
// before you begin drawing
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var streamSize = random(5, 36);
    var y = random(0, -1000);
    var speed = random(5, 10);
    for (var j = 0; j <= streamSize; j++) {
      var symbol = new Symbol(x, y, speed);
      symbol.setToRandomSymbol();
      symbols.push(symbol);
      y -= symbolSize;
    }
    x += symbolSize;
  }
}

// you always need a draw function in p5.js
// this is the function that gets called continuously in the background
// you can think of this function as what gets applied in each frame
function draw() {
  background(0);
  symbols.forEach(function(s) {
    s.render();
  });
}

function Symbol(x, y, speed) {
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;

  this.switchInterval = round(random(2, 25));

  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0) {
        // set it to Katakana
        this.value = String.fromCharCode(
          0x30A0 + round(random(0, 96))
      );
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

  this.render = function() {
      fill(140, 255, 170);
      text(this.value, this.x, this.y);
      textSize(symbolSize);
      this.rain();
      this.setToRandomSymbol();
  }
}
