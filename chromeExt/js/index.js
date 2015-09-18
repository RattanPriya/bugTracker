(function initialize() {
	
	document.getElementsByClassName('play')[0].onclick = function () {
		//debugger;
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
		console.log("forward clicked");
		chrome.tabs.executeScript({
			file: 'js/foward.js'
		});
	}


})();

