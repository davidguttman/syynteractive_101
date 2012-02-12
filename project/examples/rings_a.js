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

    // create a function that will take a ring and call "draw()" on it
    var drawRing = function(ring) {
      ring.draw();
    };

    // iterate over all rings, using that function
    _.each(self.rings, drawRing);

  };

  // This will be called every time the mouse moves
  p5.mouseMoved = function() {
    
  };

  // This will be called every time the mouse is clicked
  p5.mouseClicked = function() {

    // create a new ring object, passing it the current mouse position
    ring = new Ring(p5, {
      x: p5.mouseX,
      y: p5.mouseY
    });

    self.rings.push(ring);
  };

  p5.mouseDragged = function() {
    
  };
  
  p5.mouseReleased = function() {

  };

};


var Ring = function(p5, options) {
  var self = this;

  var setup = function() {
    // store a copy of the x and y that were passed in
    self.x = options.x;
    self.y = options.y;

    // start with a radius of 0
    self.r = 0;
  };

  self.draw = function() {
    // increase the radius by 1 each frame
    self.r += 1;

    // set the stroke and fill
    p5.stroke(255);
    p5.strokeWeight(2);
    p5.noFill();

    // draw the circle using stored x, y, and r
    p5.ellipse(self.x, self.y, self.r, self.r);
  };

  setup();
};