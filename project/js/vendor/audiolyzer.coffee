class Audiolyzer

  constructor: (url) ->
    @url = url

    @is_playing = false

    @freqByteData = []
    @timeByteData = []

    @audioContext = new window.webkitAudioContext()

    @loadAudio @url

  loadAudio: (url) ->
    @source = @audioContext.createBufferSource()
    @analyser = @audioContext.createAnalyser()
    # @analyser.fftSize = 256

    # Connect audio processing graph
    @source.connect @analyser
    @analyser.connect @audioContext.destination

    @loadAudioBuffer url

  loadAudioBuffer: (url) ->
    request = new XMLHttpRequest()
    request.open "GET", url, true
    request.responseType = "arraybuffer"

    request.onload = =>
      @audioBuffer = @audioContext.createBuffer request.response, false
      @finishLoad()

    request.send()

  finishLoad: ->
    @source.buffer = @audioBuffer;
    # @source.looping = true
    @source.noteOn 0.0

    @freqByteData = new Uint8Array @analyser.frequencyBinCount
    @timeByteData = new Uint8Array @analyser.frequencyBinCount

    @is_playing = true

  updateAudio: (smoothing=0.0)->
    @analyser.smoothingTimeConstant = smoothing
    @analyser.getByteFrequencyData @freqByteData
    @analyser.getByteTimeDomainData @timeByteData

window.Audiolyzer = Audiolyzer