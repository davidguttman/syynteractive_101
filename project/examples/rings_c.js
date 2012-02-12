console.log("Welcome to Interactive Visuals 101!");

Number.prototype.mod = function(n) {
  return ((this%n)+n)%n;
}

////////////////
// PAGE SETUP //
////////////////

// This grabs the document and tells the page what to do when it's ready
$(document).ready(function() {

  // Select the canvas element
  var canvas = document.getElementById('p5');
  
  // Create a new Processing instance with 'canvas' and pass it to 'startProcessing'
  new Processing(canvas, startProcessing);

});


///////////////
// Fun Stuff //
///////////////

// This function will receive the Processing instance created above, and will refer to it internally as 'p5'
var startProcessing = function(p5) {
  var self = this;

  // This will be called once at the beginning
  p5.setup = function() {
    p5.size(window.innerWidth, window.innerHeight);
    p5.background(30);

    self.rings = []

  };
  
  p5.draw = function() {
    p5.background(30);

    var activeRings = [];

    var drawRing = function(ring) {
      ring.draw();
      if (ring.active == true) {
        activeRings.push(ring);
      };
    };

    _.each(self.rings, drawRing);

    self.rings = activeRings;

  };

  // This will be called every time the mouse moves
  p5.mouseMoved = function() {
    
  };

  // This will be called every time the mouse is clicked
  p5.mouseClicked = function() {
    self.createRingGenerator(p5.mouseX, p5.mouseY);
  };

  p5.mouseDragged = function() {
    
  };
  
  p5.mouseReleased = function() {

  };

  self.createRingGenerator = function(x, y) {
    
    var createRing = function() {
      
      var ring = new Ring(p5, {
        x: x,
        y: y
      });

      self.rings.push(ring);
    };

    createRing();
    setInterval(createRing, 2000);
  };

};


var Ring = function(p5, options) {
  var self = this;

  var setup = function() {
    self.x = options.x;
    self.y = options.y;

    self.active = true;

    self.r = 0;

    self.maxR = 2*Math.sqrt(Math.pow(p5.width, 2) + Math.pow(p5.height, 2));
  };

  self.draw = function() {
    self.r += 1;

    p5.stroke(255);
    p5.strokeWeight(1);
    p5.noFill();


    if (self.r > self.maxR) {
      self.active = false;
    };

    p5.ellipse(self.x, self.y, self.r, self.r);
    
  };

  setup();
};