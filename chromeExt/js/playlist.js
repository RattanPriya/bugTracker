//debugger;

function Player() {
	this.state = ['start', 'play', 'pause'];
	this.counter = 0;
};

Player.prototype.init = function() {
	//debugger;
	this.showList();

}

Player.prototype.showList = function() {
	var data = queue;
	var state = this.getNextState();
	var list = document.createElement("ul");
	list.setAttribute("class", "click-list");
	document.getElementById("ChatTabsPagelet").appendChild(list);
	startDrawing(list);
	list.textContent = '';
	/*this.setVisibility();*/
	for (var i = queue.length - 1; i >= 0; i--) {
		var click = queue[i];
		var item = document.createElement("li");
		
		item.setAttribute("class", "class-list-item")
		
		if (click.error) {
			item.setAttribute("class", "class-list-item-error");
		}

		var textnode = document.createTextNode(click.X + " " + click.Y);
		item.appendChild(textnode);
		list.appendChild(item);

	}
}

Player.prototype.setVisibility = function() {
	if (this.state === "play") {
		var list = document.getElementById("click-list");
		list.style.visibility = "visible";
		document.onclick = function() {
			var click = queue.unshift();
			var item = document.createElement("li");
			var textnode = document.createTextNode(click.X + " " + click.Y);
			document.getElementById(click.parentid).style.border = "3px solid red";
			item.appendChild(textnode);
			list.appendChild(item);
			console.log(document.elementFromPoint(click.X, click.Y));
		}


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
	console.log(queue[queue.length - 1]);
	queue[queue.length - 1].error = true;
}
	
var player = new Player();
player.init();