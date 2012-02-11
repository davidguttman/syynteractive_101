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
    p5.background(30, 30, 30);

    // store whether or not we are 'recording'
    self.recording = false;

    // our list of mouse movements to play back
    self.mouseMoves = [];

    // the last place we clicked (for posiitoning playback)
    self.lastX = 0;
    self.lastY = 0;

  };
  
  // This will be called every frame
  p5.draw = function() {

    // draw a semi-opaque rectangle each frame to 'fade' the scene
    p5.noStroke();
    p5.fill(20, 40);
    p5.rect(0, 0, p5.width, p5.height);

    // set the stroke weight and color
    p5.strokeWeight(4);
    p5.stroke(180, 180, 180);

    // don't do anything if a) we are recording or b) don't have mouse moves yet
    if (self.recording === false && self.mouseMoves.length > 0) {
      
      // what position to play back from?
      var index = p5.frameCount % self.mouseMoves.length;

      // grab the move at that position
      var move = self.mouseMoves[index];

      // break it down into changes in x, y
      var dx = move[0];
      var dy = move[1];

      // apply the move to our current position to get new coordinates
      var x = self.lastX + dx;
      var y = self.lastY + dy;

      // draw the line
      p5.line(self.lastX, self.lastY, x, y);

      // bring coordinates back in frame if necessary
      self.lastX = x.mod(p5.width);
      self.lastY = y.mod(p5.height);
    };

  
  };

  // This will be called every time the mouse moves
  p5.mouseMoved = function() {
    
  };

  // This will be called every time the mouse is clicked
  p5.mouseClicked = function() {
    
  };

  p5.mouseDragged = function() {
    // reset moves if this is a new recording
    if (self.recording === false) {
      self.mouseMoves = [];
    };

    // set this so we know we're recording
    self.recording = true;

    // grab the changes in x, y
    var dx = p5.mouseX - p5.pmouseX;
    var dy = p5.mouseY - p5.pmouseY;

    // add the changes to the end of our moves list
    self.mouseMoves.push([dx, dy]);

    // draw a line
    p5.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);
  };
  
  p5.mouseReleased = function() {

    // mouse is released, stop recording and set our position
    self.recording = false;
    self.lastX = p5.mouseX;
    self.lastY = p5.mouseY;
  };

};
