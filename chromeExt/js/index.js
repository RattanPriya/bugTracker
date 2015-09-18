

(function initialize() {
	function Rewind() {
		this.disabled = true;
		this.button = document.getElementsByClassName('rewind')[0];
	}

	Rewind.prototype.disable = function() {
		this.button.className += "disabled";
		this.disabled = true;
	};

	Rewind.prototype.enable = function () {
		this.button.className = "rewind";
		this.disabled = false;
	};

	function Forward() {
		this.disabled = true;
		this.button = document.getElementsByClassName('forward')[0];
	}

	Forward.prototype.disable = function() {
		console.log(this.button);
		this.button.className += "disabled";
		this.disabled = true;
	};

	Forward.prototype.enable = function() {
		console.log(this.button);
		this.button.className = "forward";
		this.disabled = false;
	};
	var forwardButton = new Forward();
	var rewindButton = new Rewind();

	document.getElementsByClassName('play')[0].onclick = function () {
		forwardButton.enable();
		rewindButton.enable();
		chrome.tabs.executeScript({
			file: 'js/playlist.js'
		});
	};

	document.getElementsByClassName('rewind')[0].onclick = function () {

		chrome.tabs.executeScript({
			file: 'js/rewind.js'
		});
	};

	document.getElementsByClassName('forward')[0].onclick = function () {

		chrome.tabs.executeScript({
			file: 'js/foward.js'
		});
	}

	document.getElementById('click-list').onclick = function (event) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var id = event.target.id;
			chrome.tabs.sendMessage(tabs[0].id, {greeting: "listItemClick", id: id}, function(response) {
			});
		});
	};


	// request the queue
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {greeting: "queue"}, function(response) {
			if (response.queue){
				drawList(response.queue);
			}
		});
	});


	// listen for list
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
				"from the extension");
			if (request.greeting == "hello"){
				drawList(request.queue);
				sendResponse(request.queue);
			}
		});


	// draw the list
	function drawList(queue) {
		var list = document.getElementById("click-list");
		// clear the list

		while (list.hasChildNodes()) {
			list.removeChild(list.lastChild);
		}

		for (var i = queue.length - 1; i >= 0; i--) {
			var click = queue[i];
			var item = document.createElement("li");

			item.setAttribute("class", "class-list-item");
			item.setAttribute("id", i);

			if (click.error) {
				item.setAttribute("class", "class-list-item-error");
			}

			var textnode = document.createTextNode(click.X + ", " + click.Y + ": " + click.closesttext);
			item.appendChild(textnode);
			list.appendChild(item);
		}
	}


})();

