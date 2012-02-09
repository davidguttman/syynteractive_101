console.log("Welcome to Interactive Visuals 101!");


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
    p5.background(30, 30, 30);
  };
  
  // This will be called every frame
  p5.draw = function() {

    // change our stroke to white
    p5.stroke(255, 255, 255, 50);

    // draw a line from the previous location to the current location
    if (self.x) {
      p5.line(self.x, self.y, p5.mouseX, p5.mouseY);
    };
  
  };

  // This will be called every time the mouse moves
  p5.mouseMoved = function() {
    
  };

  // This will be called every time the mouse is clicked
  p5.mouseClicked = function() {
    self.x = p5.mouseX;
    self.y = p5.mouseY;
  };
  
};
