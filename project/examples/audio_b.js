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
    self.updateAudio(0.8);

    p5.fill(30, 100);
    p5.noStroke();
    p5.rect(0,0,p5.width, p5.height);

    var w = (p5.width/3)/2,
        h1 = (p5.height * self.lowFreq)/2,
        h2 = (p5.height * self.midFreq)/2,
        h3 = (p5.height * self.highFreq)/2;

    var q1x = 0,
        q2x = p5.width/2,
        q3x = 0,
        q4x = p5.width/2;

    var y = p5.height/2;

    p5.noStroke();

    var r = self.lowFreq*255,
        g = self.midFreq*255,
        b = self.highFreq*255;

    p5.fill(r, g, b);
        
    p5.rect(q1x + 0*w, y, w, -h3);
    p5.rect(q1x + 1*w, y, w, -h2);
    p5.rect(q1x + 2*w, y, w, -h1);

    p5.rect(q2x + 0*w, y, w, -h1);
    p5.rect(q2x + 1*w, y, w, -h2);
    p5.rect(q2x + 2*w, y, w, -h3);

    p5.rect(q3x + 0*w, y, w, h3);
    p5.rect(q3x + 1*w, y, w, h2);
    p5.rect(q3x + 2*w, y, w, h1);

    p5.rect(q4x + 0*w, y, w, h1);
    p5.rect(q4x + 1*w, y, w, h2);
    p5.rect(q4x + 2*w, y, w, h3);
    

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

  self.updateAudio = function(smoothing) {
    self.audio.updateAudio(smoothing);
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
