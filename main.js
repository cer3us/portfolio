let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 4;

let player1Score =0;
let player2Score =0;
const WINNING_SCORE = 3;
let showingWinScreen = false;

let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

const calculateMousePos = (evt) => {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;
	let mouseX = evt.clientX - rect.left - root.scrollLeft;
	let mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
};

const handleMouseClick = (evt) => {
	if (showingWinScreen) {
		player1Score = 0;
		player2Score = 0;
		showingWinScreen = false;
	}
};

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	const framesPerSecond = 30;
	// set a timer to slow the drawEverything() to be able to see the motion of the objects
	// Execute a specified block of code repeatedly with a fixed time delay between each call.
	setInterval(() => {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
	canvas.addEventListener('mousedown', handleMouseClick);
	canvas.addEventListener('mousemove', (evt) => {
		let mousePos = calculateMousePos(evt);
		paddle1Y = mousePos.y - (PADDLE_HEIGHT/2); // y points direction from top to BOTTOm, not from bottom to top!
	});
};
//right paddle behavior
const computerMovement = () => {
	let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if (paddle2YCenter < ballY-35) { //if the ball is 35 px above and below the paddle CENTER, paddle stops moving = less jittering 
		paddle2Y += 6;
	} else if (paddle2YCenter > ballY+35) {
		paddle2Y -= 6;
	}
}; 
const moveEverything = () => {
	if (showingWinScreen) {
		return; //freezes the movement when WINNINIG SCREEN is shown
	};

	computerMovement();
	//each time we update the screen, ballX increases
	ballX += ballSpeedX; // constant movement to the right
	ballY += ballSpeedY;

	if (ballX > canvas.width) {
		if (ballY > paddle2Y &&
			ballY < paddle2Y + PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;
			let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2); // deltaY defines how close from the paddle center the ball hits the paddle to vary ball's speed accordingly
			ballSpeedY = deltaY*0.35; //Y speed increases to 35% of the deltaY
		} else {
				player1Score ++; //must be before ballReset()
				ballReset();
		}
	};	
	if (ballX < 0) {
		//ball resets if misses the paddle
		if (ballY > paddle1Y &&
			ballY < paddle1Y + PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;
			let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2); // deltaY defines how close from the paddle center the ball hits the paddle to vary ball's speed accordingly
			ballSpeedY = deltaY*0.35;
		} else {
				player2Score ++;
				ballReset();
		}
	};
		
	if (ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	};
	if (ballY < 0) {
		ballSpeedY = -ballSpeedY;
	};

};

const ballReset = () => {
	if (player1Score >= WINNING_SCORE || 
		player2Score >= WINNING_SCORE) {
			showingWinScreen = true;
	}
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
};
const drawNet = () => {
	for (let i=0; i<canvas.height; i+=40) {
		drawObject(canvas.width/2-1, i, 2, 20, 'white');//width/2-1 - centers the net, = left:50%, transform:translate(-50%);
	}
};
//draw elements
const drawEverything = () => {
	// creating a black background box	
	drawObject(0,0,canvas.width, canvas.height, 'black');
	if (showingWinScreen) {
		canvasContext.fillStyle = 'white';
		if (player1Score >= WINNING_SCORE) {
			canvasContext.fillText("LEFT player WON!", 350,200);
		} else if (player2Score >= WINNING_SCORE) {
			canvasContext.fillText("RIGHT player WON!", 350,200);
		}	
		canvasContext.fillText("Click to continue", 350,500);
		return; //freezes the objects drawing
	};
	//Net
	drawNet();
	//left tennis paddle 
	drawObject(0,paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	//right tennis paddle
	drawObject(canvas.width - PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT, 'white');
	// ball
	drawCircle(ballX, ballY, 10, 'white');
	// score
	canvasContext.fillText(player1Score, 100,100);
	canvasContext.fillText(player2Score, canvas.width-100,100);
};

const drawCircle = (centerX, centerY, radius, color) => {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);//startAngle = 0 degrees, endAngle = 360 degrees or Math.PI*2 
	canvasContext.fill();
};
const drawObject = (leftX, topY, width, height, color) => {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(leftX, topY, width, height);
};