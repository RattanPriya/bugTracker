// given an array of coordinates, draw those coordinates on a client's site
// solution: use html Canvas. Draw a transparent canvas over the entire site and draw circles on the canvas.

// Don't delete these. They are for testing

//var coordinates = [
//    {
//        pageX: 555,
//        pageY: 555,
//        time: 0,
//        error: false
//    },
//    {
//        pageX: 444,
//        pageY: 100,
//        time: 0,
//        error: false
//    },
//    {
//        pageX: 555,
//        pageY: 333,
//        time: 0,
//        error: false
//    }
//];



var coordinates = queue;

var clicks = [];
var counter = 0;
// CIRCLE OBJECTS!


function Circle(x, y, count) {
    this.initialRenderComplete = false;
    this.retrievedNext = false;

    this.canvas = document.getElementById("myCanvas");
    this.context = this.canvas.getContext("2d");
    this.radius = 35;
    this.r = 57;
    this.g = 195;
    this.b = 254;
    this.x = x;
    this.y = y;

    this.numBlinks = 0;

    this.count = count;

    this.strokeStyle = "#39c3fe";

    // for blinking
    this.opacity = 0;
    this.opacityFadeInIncrement = .05;
    this.opacityFadeOutIncrement = .04;

    this.ringRadius = this.radius;
    this.ringRadiusFadeOutIncrement = 1.2;
    this.ringRadiusFadeInIncrement = .6;
    this.radiusFadeOutIncrement = .6;
    this.isFadeIn = true;
}

Circle.prototype.blink = function (numBlinks) {
    if (this.isFadeIn){
        this.fadeIn()
    }
    else {
        this.fadeOut();
    }
};

Circle.prototype.fadeIn = function(){
    this.opacity = this.opacity + this.opacityFadeInIncrement;
    this.ringRadius += this.ringRadiusFadeInIncrement;
    if (this.opacity > 1){
        this.isFadeIn = false;
    }
};

Circle.prototype.fadeOut = function(){
    this.opacityIncrement = this.opacityFadeOutIncrement;
    this.opacity -= this.opacityIncrement;
    this.ringRadius -= this.ringRadiusFadeOutIncrement;
    this.radius -= this.radiusFadeOutIncrement;

    if (this.opacity < 0){
        this.isFadeIn = true;
        this.numBlinks++
    }
};

Circle.prototype.render = function(){
    // draw the Circle. If the circle has completed one fade in cycle, initialRenderComplete is true and we get the next coordinate.
    if (this.initialRenderComplete && !this.retrievedNext) {
        this.retrievedNext = true;
        setTimeout(function(){
            processNextCoordinate();
        }, 100)
    } else {
        if (this.numBlinks == 1){
            this.initialRenderComplete = true;
        }

        if (!this.initialRenderComplete){
            this.blink();
        } else {
            this.ringRadius = 15;
            this.radius = 15;
        }
    }

    this.drawCircle();
    this.insertNumber();

};

Circle.prototype.pulse = function() {
    if (this.opacity > 1){
        this.opacity = 1;
        this.ringRadius = 10;
    }

    if (this.isFadeIn){
        this.fadeIn()
    } else {
        this.fadeOut();
    }
}

Circle.prototype.insertNumber = function () {
    // text
    this.context.font = '16pt Calibri';
    this.context.textAlign= 'center';
    this.context.fillStyle = 'rgba(0,0,0,1)';
    this.context.fillText(this.count, this.x, this.y+8);

}


Circle.prototype.drawCircle = function () {
    var centerX = this.x;
    var centerY = this.y;
    var radius = this.radius;

    // circle
    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = "rgba("+ this.r+", "+this.g +", "+ this.b+", "+ this.opacity +")";
    this.context.fill();
    this.context.lineWidth = 1;
    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke();


    // ring
    this.context.beginPath();
    this.context.arc(centerX, centerY, this.ringRadius, 0, 2 * Math.PI, false);
    this.context.fillStyle = "rgba("+ this.r+", "+this.g +", "+ this.b+", .2)";
    this.context.fill();
    this.context.lineWidth = 1;
    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke();


};



// MAIN FUNCTIONS

function clear() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.clearRect(0,0, canvas.width, canvas.height);
}

function render() {
    clear();
    for (var i = 0; i < clicks.length; i ++){
        clicks[i].render();
    }
}

function shouldRender() {
    for (var i = 0; i < clicks.length; i ++){
        if (clicks[i].initialRenderComplete){
            return true;
        }
    }

    return false;
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

function processNextCoordinate() {
    var coord = getNextCoord();
    if (!coord){
        return
    }

    counter++;
    var circle = new Circle(coord.X, coord.Y, counter);
    clicks.push(circle);
    circle.render();
}

function getNextCoord(){
    return coordinates.shift();
}

function startDrawing() {
    createCanvasOverlay();
    processNextCoordinate();

    timeout();
}


function timeout () {
    setTimeout(function() {
        //if (shouldRender()){
            render();
            timeout();
        //}

    }, 60);
}