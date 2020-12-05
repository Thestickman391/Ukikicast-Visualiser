function start() {
	var button = document.getElementById("start"); 
	button.style.visibility = 'hidden';

	var intro = document.getElementById("intro");
	intro.play();

	var audio1 = document.getElementById("audio1");
	audio1.src = "./thing - 000.wav";
	audio1.load();
	audio1.play();
	var context1 = new AudioContext();
	var src1 = context1.createMediaElementSource(audio1);
	var analyser1 = context1.createAnalyser();

	var canvas1 = document.getElementById("canvasInterviewer");
	canvas1.width = window.innerWidth;
	canvas1.height = window.innerHeight;
	var ctx1 = canvas1.getContext("2d");

	src1.connect(analyser1);
	analyser1.connect(context1.destination);

	analyser1.fftSize = 256;

	var bufferLength1 = analyser1.frequencyBinCount;
	console.log(bufferLength1);

	var dataArray1 = new Uint8Array(bufferLength1);

	var WIDTH1 = canvas1.width;
	var HEIGHT1 = canvas1.height;
	console.log(HEIGHT1);

	var barWidth1 = (WIDTH1 / bufferLength1) * 2.5;
	var barHeight1;
	var x1 = 0;

	function renderFrame1() {
	  requestAnimationFrame(renderFrame1);

	  x1 = 0;

	  analyser1.getByteFrequencyData(dataArray1);

	  ctx1.clearRect(0,0,canvas1.width,canvas1.height);

	  for (var i = 0; i < bufferLength1; i++) {
		barHeight1 = dataArray1[i] * 2;
		
		var r = 0;
		var g = 170;
		var b = 255;

		ctx1.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
		ctx1.fillRect(x1, HEIGHT1 - barHeight1, barWidth1, barHeight1);

		x1 += barWidth1 - 1;
	  }
	}

	audio1.play();
	renderFrame1();
	
	var audio2 = document.getElementById("audio2");
	audio2.src = "./23 - 10,000 Spoons.mp3";
	audio2.load();
	audio2.play();
	var context2 = new AudioContext();
	var src2 = context2.createMediaElementSource(audio2);
	var analyser2 = context2.createAnalyser();

	var canvas2 = document.getElementById("canvasInterviewee");
	canvas2.width = window.innerWidth;
	canvas2.height = window.innerHeight;
	var ctx2 = canvas2.getContext("2d");

	src2.connect(analyser2);
	analyser2.connect(context2.destination);

	analyser2.fftSize = 256;

	var bufferLength2 = analyser2.frequencyBinCount;
	console.log(bufferLength2);

	var dataArray2 = new Uint8Array(bufferLength2);

	var WIDTH2 = canvas2.width;
	var HEIGHT2 = canvas2.height;
	console.log(HEIGHT2);

	var barWidth2 = (WIDTH2 / bufferLength2) * 2.5;
	var barHeight2;
	var x2 = 0;

	function renderFrame2() {
	  requestAnimationFrame(renderFrame2);

	  x2 = 0;

	  analyser2.getByteFrequencyData(dataArray2);

	  ctx2.clearRect(0,0,canvas2.width,canvas2.height);

	  for (var i = 0; i < bufferLength2; i++) {
		barHeight2 = dataArray2[i] * 2;
		
		var r = 255;
		var g = 64;
		var b = 64;

		ctx2.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
		ctx2.fillRect(x2, HEIGHT2 - barHeight2, barWidth2, barHeight2);

		x2 += barWidth2 - 1;
	  }
	}

	audio2.play();
	renderFrame2();
};