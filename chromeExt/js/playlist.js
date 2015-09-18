//debugger;

function Player() {
	this.state = ['start', 'play', 'pause'];
	this.counter = 0;
};


Player.prototype.init = function() {
	setTimeout(function(){
		this.showList();

	}, 2000)

};

Player.prototype.sendDataToExtension = function() {
	chrome.runtime.sendMessage({queue: queue.queue, greeting: "hello"}, function(response) {
		console.log("sendMessageResponse: "+ response);
		if (!response){
			this.sendDataToExtension();
		} else {
			return;
		}
	}.bind(this));
};

Player.prototype.showList = function() {

	var state = this.getNextState();
	this.sendDataToExtension();
	startDrawing(queue.queue);
	/*this.setVisibility();*/

};

Player.prototype.setVisibility = function() {
	if (this.state === "play") {
		var list = document.getElementById("click-list");
		list.style.visibility = "visible";
		//document.onclick = function() {
		//	var click = queue.unshift();
		//	var item = document.createElement("li");
		//	var textnode = document.createTextNode(click.X + " " + click.Y);
		//	document.getElementById(click.parentid).style.border = "3px solid red";
		//	item.appendChild(textnode);
		//	list.appendChild(item);
		//	console.log(document.elementFromPoint(click.X, click.Y));
		//}


	} else if (this.state === "start") {
		var list = document.getElementById("click-list");
		/*list.style.visibility = "hidden";*/

	} else if (this.state === "pause") {
		var list = document.getElementById("click-list");
		/*list.style.visibility = "hidden";*/
	}

	return this.state;
}


Player.prototype.getNextState = function() {
	if (this.counter > 2) {
		this.counter = 0;
	}
	this.counter++;
	this.state = this.state[this.counter];
	return this.state;
}


window.onerror = function() {
	console.log(queue.queue[queue.queue.length - 1]);
	queue.queue[queue.queue.length - 1].error = true;
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.greeting == "queue"){
			sendResponse({queue: queue.queue});
		}
	});

var player = new Player();
player.init();

