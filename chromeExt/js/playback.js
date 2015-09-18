// given an array of coordinates, draw those coordinates on a client's site
// solution: use html Canvas. Draw a transparent canvas over the entire site and draw circles on the canvas.

// Don't delete these. They are for testing

var dummyCoordinates = [
    {
        X: 555,
        Y: 555,
        time: 0,
        error: false
    },
    {
        X: 444,
        Y: 100,
        time: 0,
        error: false
    },
    {
        X: 555,
        Y: 333,
        time: 0,
        error: true
    }
];


var QUEUE_SIZE = 30;

var playback = new PlayBack();

function PlayBack() {
    this.coordinates = queue;
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
    this.opacityFadeOutIncrement = .03;

    this.ringRadius = this.radius;
    this.ringRadiusFadeOutIncrement = 1.5;
    this.ringRadiusFadeInIncrement = .6;
    this.radiusFadeOutIncrement = 1;
    this.isFadeIn = true;
    this.isSelected = false;
}


Circle.prototype.init = function (){
    this.blink();
};

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
    this.fadeIn(this.fadeOut);
};

Circle.prototype.fadeIn = function(callback){
        setTimeout(function(){
            this.opacity = this.opacity + this.opacityFadeInIncrement;
            this.ringRadius += this.ringRadiusFadeInIncrement;
            render();
            if (this.opacity < 1) {

                if (callback){
                    this.fadeIn(callback.bind(this));
                } else {
                    this.fadeIn();
                }
            }
            else{
                this.isFadeIn = false;
                if (callback){
                    callback();
                }
            }
        }.bind(this), 15);
};

Circle.prototype.fadeOut = function(callback){
    setTimeout(function(){
        this.opacityIncrement = this.opacityFadeOutIncrement;
        this.opacity -= this.opacityIncrement;
        this.ringRadius -= this.ringRadiusFadeOutIncrement;
        this.radius -= this.radiusFadeOutIncrement;

        render();
        if (this.opacity > .5) {
            if (callback){
                this.fadeOut(callback.bind(this));
            } else {
                this.fadeOut();
            }
        }
        else{
            this.isFadeIn = true;
            if (callback){
                callback();
            }
            console.log(this.opacity);
            this.numBlinks++;
            this.render();
        }
    }.bind(this), 60);
};

Circle.prototype.render = function(){

    //// draw the Circle. If the circle has completed one fade in cycle, initialRenderComplete is true and we get the next coordinate.

    if (this.numBlinks == 1 && !this.retrievedNext){
        this.retrievedNext = true;
        setTimeout(function(){
            processNextCoordinate();
        }, 1)
    }

    this.drawCircle();
    //this.insertNumber();

};

Circle.prototype.unSelected = function() {
    this.isSelected = false;
    this.fadeOut();
    render();
};

Circle.prototype.selected = function() {
    this.isSelected = true;
    this.radius = 35;
    this.ringRadius = 35;
    this.opacity = 0;
    this.fadeIn();
    render();
};

Circle.prototype.insertNumber = function () {
    // text
    this.context.font = '16pt Arial';
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


// PROCESS COORDS

function processNextCoordinate() {
    var coord = getNextCoord();
    if (!coord){
        return
    }
    var circle = new Circle(coord.X, coord.Y, coord.error, playback.counter+1);
    playback.clicks.push(circle);
    playback.currentClick = playback.clicks[playback.counter];
    playback.counter++;
    circle.blink();
}

function getNextCoord(){
    return playback.coordinates[playback.counter];
}

function startDrawing() {

    createCanvasOverlay();
    processNextCoordinate();

}

function test(){
    createCanvasOverlay();

    playback.coordinates = dummyCoordinates;

    processNextCoordinate();
    //var coord = dummyCoordinates[0]
    //var circle = new Circle(coord.X, coord.Y, coord.error, playback.counter+1);
    //playback.clicks.push(circle);
    //circle.blink();
}

//test();
