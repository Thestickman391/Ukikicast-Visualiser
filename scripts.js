function start() {
	var audio1 = document.getElementById("audio1");
	audio1.src = "./23 - 10,000 Spoons.mp3";
	audio1.load();
	audio1.play();
	var context = new AudioContext();
	var src = context.createMediaElementSource(audio1);
	var analyser = context.createAnalyser();

	var canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext("2d");

	src.connect(analyser);
	analyser.connect(context.destination);

	analyser.fftSize = 512;

	var bufferLength = analyser.frequencyBinCount;
	console.log(bufferLength);

	var dataArray = new Uint8Array(bufferLength);

	var WIDTH = canvas.width;
	var HEIGHT = canvas.height;
	console.log(HEIGHT);

	var barWidth = (WIDTH / bufferLength) * 2.5;
	var barHeight;
	var x = 0;

	function renderFrame() {
	  requestAnimationFrame(renderFrame);

	  x = 0;

	  analyser.getByteFrequencyData(dataArray);

	  ctx.clearRect(0,0,canvas.width,canvas.height);

	  for (var i = 0; i < bufferLength; i++) {
		barHeight = dataArray[i] * 2;
		
		var r = 0;
		var g = 170;
		var b = 255;

		ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
		ctx.fillRect(x, HEIGHT - barHeight, barWidth, HEIGHT);

		x += barWidth + 1;
	  }
	}

	audio1.play();
	renderFrame();
};