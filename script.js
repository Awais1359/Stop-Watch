// script.js
let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.querySelector('.display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

// Format time as HH:MM:SS
function formatTime(milliseconds) {
  let hours = Math.floor(milliseconds / 3600000);
  let minutes = Math.floor((milliseconds % 3600000) / 60000);
  let seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Update the display
function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}


// Start the stopwatch
function start() {
  if (!startTime) {
    startTime = Date.now() - elapsedTime;
  }
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

// Stop the stopwatch
function stop() {
  clearInterval(timerInterval);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

// Reset the stopwatch
function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  startTime = null;
  updateDisplay();
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

// Event listeners for buttons
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);


const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const balls = []; // Array to hold multiple balls
    const numBalls = 15; // Number of balls to create


 // Function to generate a random color
 function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Ball class to define ball properties and behaviors
class Ball {
    constructor(x, y, radius, xSpeed, jumpStrength, color) {
        this.x = x; // Horizontal position
        this.y = y; // Vertical position
        this.radius = radius; // Radius of the ball
        this.xSpeed = xSpeed; // Speed of the ball moving left to right
        this.ySpeed = 0; // Initial vertical speed
        this.gravity = 0.5; // Gravity effect
        this.jumpStrength = jumpStrength; // Strength of the jump
        this.color = color; // Color of the ball
        this.jumpDelay = Math.random() * 1000; // Random delay for jumping
        this.lastJumpTime = 0; // Last jump time
    }

    update(currentTime) {
        // Check if it's time to jump
        if (currentTime - this.lastJumpTime > this.jumpDelay) {
            this.ySpeed = this.jumpStrength ; // Make the ball jump
            this.lastJumpTime = currentTime; // Update last jump time
        }

        // Update ball position
        this.x += this.xSpeed; // Move the ball horizontally
        this.y += this.ySpeed; // Move the ball vertically
        this.ySpeed += this.gravity; // Apply gravity

        // Bounce off the bottom
        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius; // Reset position to the bottom
            this.ySpeed = 0; // Stop vertical movement
        }

        // Bounce off the sides
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.xSpeed = -this.xSpeed; // Reverse direction
        }
    }

    draw() {
        // Draw the ball
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color; // Use the ball's color
        ctx.fill();
        ctx.closePath();
    }
}

// Create multiple balls
for (let i = 0; i < numBalls; i++) {
    const radius = 20; // Radius of the ball
    const x = Math.random() * (canvas.width - radius * 2) + radius; // Random initial x position
    const y = canvas.height - radius; // Start at the bottom
    const xSpeed = Math.random() * 3 + 1; // Random horizontal speed
    const jumpStrength = -10; // Strength of the jump
    const color = getRandomColor(); // Get a random color

    balls.push(new Ball(x, y, radius, xSpeed, jumpStrength, color)); // Add ball to the array
}

function animate(currentTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Update and draw each ball
    for (const ball of balls) {
        ball.update(currentTime);
        ball.draw();
    }

    requestAnimationFrame(animate); // Call animate again for the next frame
}

// Start the animation
requestAnimationFrame(animate);