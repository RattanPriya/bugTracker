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


function drawCircle(x, y) {
    var myCanvas = document.getElementById("myCanvas");
    var context = myCanvas.getContext("2d");
    var centerX = x;
    var centerY = y;
    var radius = 10;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();   
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
    for (var i = 0; i < coordinates.length; i++){
        drawCircle(coordinates[i].clientX, coordinates[i].clientY);
    }
}

function init() {
    createCanvasOverlay();    
    processCoordinates();
}

init();
