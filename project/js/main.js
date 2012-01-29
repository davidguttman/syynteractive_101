console.log("Welcome!");

var startProcessing = function(p5) {
  
  p5.setup = function() {
    
  };
  
  p5.draw = function() {
    
  };
  
};

$(document).ready(function() {

  var canvas = document.getElementById('p5');
  
  new Processing(canvas, startProcessing);

});