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
  };
  
  p5.draw = function() {
    var xRatio = p5.mouseX / p5.width;
    var yRatio = p5.mouseY / p5.height;

    var r = xRatio * 255;
    var g = yRatio * 255;
    var b = 127;

    p5.background(r, g, b);
  };

  // This will be called every time the mouse moves
  p5.mouseMoved = function() {
    
  };

  // This will be called every time the mouse is clicked
  p5.mouseClicked = function() {
    
  };

  p5.mouseDragged = function() {
    
  };
  
  p5.mouseReleased = function() {

  };

};
