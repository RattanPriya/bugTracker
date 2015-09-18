// given an array of coordinates, draw those coordinates on a client's site
// solution: use html Canvas. Draw a transparent canvas over the entire site and draw circles on the canvas.

// Don't delete these. They are for testing

//var coordinates = [
//    {
//        X: 555,
//        Y: 555,
//        time: 0,
//        error: false
//    },
//    {
//        X: 444,
//        Y: 100,
//        time: 0,
//        error: false
//    },
//    {
//        X: 555,
//        Y: 333,
//        time: 0,
//        error: true
//    }
//];
//

var QUEUE_SIZE = 30;

var playback = new PlayBack();

function PlayBack() {
    this.coordinates = queue;
    this.stopRender = false;
    this.clicks = [];
    this.counter = 0;
    this.currentClick = null;
}

// CIRCLE OBJECTS!


function Circle(x, y, error, count) {
    this.initialRenderComplete = false;
    this.retrievedNext = false;

    this.canvas = document.getElementById("myCanvas");
    this.context = this.canvas.getContext("2d");
    this.radius = 35;

    this.x = x;
    this.y = y;

    this.error = error;

    this.setColor();

    this.numBlinks = 0;
    this.count = count;

    // for blinking
    this.opacity = 0;
    this.opacityFadeInIncrement = .05;
    this.opacityFadeOutIncrement = .04;

    this.ringRadius = this.radius;
    this.ringRadiusFadeOutIncrement = 1.2;
    this.ringRadiusFadeInIncrement = .6;
    this.radiusFadeOutIncrement = .6;
    this.isFadeIn = true;

    this.isSelected = false;
}

Circle.prototype.setColor = function (){
    if (this.error){
        // Error Color
        this.r = 225;
        this.g = 20;
        this.b = 20;
        this.strokeStyle = "#ff1414";

    } else {
        // nonError Color
        this.r = 57;
        this.g = 195;
        this.b = 254;
        this.strokeStyle = "#39c3fe";
    }
};

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
        }, 1)
    } else {
        if (this.numBlinks == 1){
            this.initialRenderComplete = true;
        }

        if (!this.initialRenderComplete){
            this.blink();
        } else {

            // if error
            if (this.error){
                this.opacity = .5;
            }

            if (this.isSelected){
                this.radius = 35;
                this.ringRadius = 45;
                this.opacity = .5;
            } else {
                // initial render is complete so fix the radius of the bubbles
                this.ringRadius = 15;
                this.radius = 15;
            }
        }
    }

    this.drawCircle();
    this.insertNumber();

};

Circle.prototype.selected = function() {
    this.isSelected = true;
    render();
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



// CANVAS FUNCTIONS

function clear() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.clearRect(0,0, canvas.width, canvas.height);
}

function render() {
    clear();
    for (var i = 0; i < playback.clicks.length; i ++){
        playback.clicks[i].render();

    }
}

function shouldRender() {
    return playback.stopRender|| playback.counter == QUEUE_SIZE ? false : true
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


// REWIND BUTTON







// PROCESS COORDS

function processNextCoordinate() {
    var coord = getNextCoord();
    if (!coord){
        playback.stopRender = true;
        playback.currentClick.selected();
        return
    }
    var circle = new Circle(coord.X, coord.Y, coord.error, playback.counter+1);
    playback.clicks.push(circle);
    playback.currentClick = playback.clicks[playback.counter];
    playback.counter++;
    circle.render();
}

function getNextCoord(){
    return playback.coordinates[playback.counter];
}

function startDrawing() {


    createCanvasOverlay();
    processNextCoordinate();

    timeout();
}


function timeout () {
    setTimeout(function() {
        if (shouldRender()){
            render();
            timeout();
        }

    }, 15);
}
