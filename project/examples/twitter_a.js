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

    var font = p5.loadFont("helvetica");
    p5.textFont(font);
    p5.textSize(14);

    self.tweetData = [];

    self.tweets = [];

    self.searchTwitter();

  };
  
  p5.draw = function() {
    p5.background(30);
    if (self.tweetData.length > 0) {

      if (p5.frameCount % 60 === 0) {
        var tweet = new Tweet(p5, self.tweetData.shift());
        self.tweets.push(tweet);
      };
      
    };
    
    var activeTweets = [];

    _.each(self.tweets, function(tweet) {
      if (tweet.active) {
        tweet.draw();
        activeTweets.push(tweet);
      };
      
    });

    self.tweets = activeTweets;

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


  self.searchTwitter = function(url) {
    var baseUrl = "http://search.twitter.com/search.json";
    if (url) {
      url = baseUrl + url;
    } else {
      var url = baseUrl;
      url += "?q=lang%3Aen%20%3A)";
      url += "&include_entities=true";
    };

    url += "&rpp=100";
    url += "&result_type=recent";
    url += "&callback=?";

    console.log('hitting url: ', url);

    $.getJSON(url, function(data) {
      console.log(data);
      console.log(data.results.length);

      _.each(data.results, function(tweet) {
        if (self.tweetData.length < 200) {
          self.tweetData.push(tweet);  
        };
        
      });

      setTimeout(self.searchTwitter, 20000, data.refresh_url);
    });



  };
  
};

var Tweet = function(p5, tweet) {
  
  var self = this;

  self.setup = function() {
    self.w = 300;
    self.h = 300;

    self.x = Math.random() * (p5.width - self.w);
    self.y = -50;

    self.vel = 0;
    self.accel = 0.02;

    self.text = tweet.text;

    self.active = true;

  };

  self.draw = function() {
    self.vel += self.accel;

    self.y += self.vel;

    p5.stroke(255);
    p5.fill(255);

    p5.text(self.text, self.x, self.y, self.w, self.h);

    if (self.y > p5.height) {
      self.active = false;
    };

  };

  self.setup();

};
