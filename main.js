// кроссбраузерность
window.MyRequestAnimationFrame = (function (callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (callback) {
      window.setTimeout(callback, 1000 / 60);
  };
})();

function game() {
  var minSpeed = 1,
      maxSpeed = 5,
      startPos = 0,
      scoreCounter = 0,
      currentPosY = 0,
      squareHeight = 20,
      squareWidth = 20,
      canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      maxCanvasWidth = canvas.clientWidth,
      maxCanvasHeight = canvas.clientHeight,
      btnStart = document.getElementById('btn-start'),
      btnStop = document.getElementById('btn-stop'),
      currentPosX = calcPosAndSpeed(startPos, maxCanvasWidth),
      score = document.getElementById('score'),
      speed = calcPosAndSpeed(minSpeed, maxSpeed),
      mousePosX,
      mousePosY;

  btnStop.disabled = true;

  function animate() {

    ctx.clearRect(0, 0, maxCanvasWidth, maxCanvasHeight);
    ctx.fillRect(currentPosX, currentPosY, squareWidth, squareHeight);
    currentPosY += speed;

    mousePos();

    if(mousePosX > (currentPosX - 15)
      && mousePosX < (currentPosX + 15)
      && mousePosY > (currentPosY - 15)
      && mousePosY < (currentPosY + 15)){
      scoreCounter += 1;
      score.innerText = scoreCounter;
      ctx.clearRect(0, 0, maxCanvasWidth, maxCanvasHeight);
      currentPosY = 0;
      currentPosX = calcPosAndSpeed(maxCanvasWidth, 1);
      speed = calcPosAndSpeed(1,5);
    }

    if(currentPosY >= maxCanvasHeight) {
      currentPosY = 0;
      currentPosX = calcPosAndSpeed(maxCanvasWidth, 1);
      speed = calcPosAndSpeed(1,5);
    }

    var anim = requestAnimationFrame(animate);

    btnStop.onclick = function() {
      ctx.clearRect(0, 0, maxCanvasWidth, maxCanvasHeight);
      cancelAnimationFrame(anim);
      currentPosY = 0;
      btnStart.disabled = false;
      btnStop.disabled = true;
    }
  }

  function calcPosAndSpeed(min,max) {
    a = Math.floor(Math.random()*(max - min)+min);
    return a;
  }

  function mousePos() {
    canvas.onmousedown = function(event) {
      mousePosX = event.offsetX;
      mousePosY = event.offsetY;
    }
  }

  btnStart.onclick = function() {
    scoreCounter = 0;
    animate();
    btnStart.disabled = true;
    btnStop.disabled = false;
    score.innerText = 0;
  }
  
}

document.body.onload = game;