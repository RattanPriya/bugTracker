

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

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {id: 0}, function(response) {
			console.log(response.farewell);
		});
	});
})();

