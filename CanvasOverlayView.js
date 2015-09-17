// given an array of coordinates, draw those coordinates on a client's site
// solution: use html Canvas. Draw a transparent canvas over the entire site and draw circles on the canvas.

var coordinates = [
    {
        clientX: 555,
        clientY: 555
    },
    {
        clientX: 100,
        clientY: 200
    },
    {
        clientX: 300,
        clientY: 120
    },
];


function drawCircle(x, y, opacity) {
    var myCanvas = document.getElementById("myCanvas");
    var context = myCanvas.getContext("2d");
    var centerX = x;
    var centerY = y;
    var radius = 10;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "rgba(255,0,255, "+ opacity +")";;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#003300';
    context.stroke();   
}

function blink(x,y, num) {
    if (num > 1){
        processCoordinates();
        return;
    }
    var delay = 100;
    setTimeout(function () {
        drawCircle(x,y, num);
        blink(x, y, num+.05);
    }, delay)
}

function createCanvasOverlay()
 {
  myCanvas = document.createElement('canvas');
  myCanvas.setAttribute("id", "myCanvas");
  document.body.appendChild(myCanvas);
  myCanvas.style.position = 'absolute';
  myCanvas.style.left="0px";
  myCanvas.style.top="0px";
  myCanvas.style.zIndex="1000";
  myCanvas.style.width="100%";
  myCanvas.style.height="100%";
  myCanvas.width=myCanvas.offsetWidth;
  myCanvas.height=myCanvas.offsetHeight;
}

function processCoordinates() {
    var initOpacity = 0;
    var coord = getNextCoord();
    drawCircle(coord.clientX, coord.clientY, initOpacity);
}

function getNextCoord(){
    return coordinates.shift();
}

function init() {
    createCanvasOverlay();    
    processCoordinates();
}

init();
