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

  };
  
  p5.draw = function() {
    var nRows = 3,
        nCols = 2,
        w = p5.width/nCols,
        h = p5.height/nRows;
    
    var xColor = p5.map(p5.mouseX, 0, p5.width, 0, 255),
        yColor = p5.map(p5.mouseY, 0, p5.height, 0, 255),
        zColor = 127;

    var colorBoxes = [
      [
        [xColor, yColor, zColor],
        [xColor, zColor, yColor]
      ],
      [
        [yColor, xColor, zColor],
        [yColor, zColor, xColor]
      ],
      [
        [zColor, xColor, yColor],
        [zColor, yColor, xColor]
      ]
    ];

    _.each(colorBoxes, function(row, vPos) {
      _.each(row, function(boxColors, hPos) {
        var x = hPos * w,
            y = vPos * h;

        var r = boxColors[0],
            g = boxColors[1],
            b = boxColors[2];

        p5.noStroke();
        p5.fill(r, g, b);
        p5.rect(x, y, w, h);
      });
    });

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
