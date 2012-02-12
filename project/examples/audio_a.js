console.log("Welcome to Interactive Visuals 101!");

Number.prototype.mod = function(n) {
  return ((this%n)+n)%n;
}

Array.prototype.sum = function() {
  var sum = _.reduce(this, function(memo, num) {
    return memo + num;
  }, 0);
  return sum;
};

Array.prototype.mean = function() {
  return (this.sum()/this.length);
};

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

    self.audio = new Audiolyzer('audio/1.mp3');
  };
  
  p5.draw = function() {
    self.updateAudio();

    p5.background(30);

    p5.stroke(255);
    p5.fill(255);

    // set the width of each "bar"
    var w = p5.width/3;

    // draw each bar using stored frequencies
    p5.rect(0*w, p5.height, w, -p5.height * self.lowFreq);
    p5.rect(1*w, p5.height, w, -p5.height * self.midFreq);
    p5.rect(2*w, p5.height, w, -p5.height * self.highFreq);

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

  self.updateAudio = function() {
    self.audio.updateAudio(0.0);
    self.allFreqs = self.audio.freqByteData;

    var nFreqs = self.allFreqs.length,
        lowFreqs = [],
        midFreqs = [],
        highFreqs = [];

    _.each(self.allFreqs, function(freq, i) {
      if (i < nFreqs/3) {
        lowFreqs.push(freq);
      } else if (i > 2*nFreqs/3) {
        highFreqs.push(freq);
      } else {
        midFreqs.push(freq);
      };
    });

    self.lowMean = lowFreqs.mean();
    self.midMean = midFreqs.mean();
    self.highMean = highFreqs.mean();

    // set low max/min
    self.lowMax = self.lowMax || self.lowMean;
    self.lowMin = self.lowMin || self.lowMean;

    if (self.lowMean > self.lowMax) self.lowMax = self.lowMean;
    if (self.lowMean < self.lowMin) self.lowMin = self.lowMean;

    // set mid max/min
    self.midMax = self.midMax || self.midMean;
    self.midMin = self.midMin || self.midMean;

    if (self.midMean > self.midMax) self.midMax = self.midMean;
    if (self.midMean < self.midMin) self.midMin = self.midMean;

    // set high max/min
    self.highMax = self.highMax || self.highMean;
    self.highMin = self.highMin || self.highMean;

    if (self.highMean > self.highMax) self.highMax = self.highMean;
    if (self.highMean < self.highMin) self.highMin = self.highMean;


    self.lowFreq = p5.norm(self.lowMean, self.lowMin, self.lowMax);
    self.midFreq = p5.norm(self.midMean, self.midMin, self.midMax);
    self.highFreq = p5.norm(self.highMean, self.highMin, self.highMax);
  };

};
