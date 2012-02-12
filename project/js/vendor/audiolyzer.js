(function() {
  var Audiolyzer;

  Audiolyzer = (function() {

    function Audiolyzer(url) {
      this.url = url;
      this.is_playing = false;
      this.audioContext = new window.webkitAudioContext();
      this.loadAudio(this.url);
    }

    Audiolyzer.prototype.loadAudio = function(url) {
      this.source = this.audioContext.createBufferSource();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      return this.loadAudioBuffer(url);
    };

    Audiolyzer.prototype.loadAudioBuffer = function(url) {
      var request,
        _this = this;
      request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";
      request.onload = function() {
        _this.audioBuffer = _this.audioContext.createBuffer(request.response, false);
        return _this.finishLoad();
      };
      return request.send();
    };

    Audiolyzer.prototype.finishLoad = function() {
      this.source.buffer = this.audioBuffer;
      this.source.looping = true;
      this.source.noteOn(0.0);
      this.freqByteData = new Uint8Array(this.analyser.frequencyBinCount);
      this.timeByteData = new Uint8Array(this.analyser.frequencyBinCount);
      return this.is_playing = true;
    };

    Audiolyzer.prototype.updateAudio = function(smoothing) {
      if (smoothing == null) smoothing = 0.0;
      this.analyser.smoothingTimeConstant = smoothing;
      this.analyser.getByteFrequencyData(this.freqByteData);
      return this.analyser.getByteTimeDomainData(this.timeByteData);
    };

    return Audiolyzer;

  })();

  window.Audiolyzer = Audiolyzer;

}).call(this);
