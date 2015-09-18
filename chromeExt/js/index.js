(function initialize() {

	document.getElementsByClassName('play')[0].onclick = function () {
		//debugger;
		chrome.tabs.executeScript({
			file: 'js/playlist.js'
		});
	}

	document.getElementsByClassName('rewind')[0].onclick = function () {
		chrome.tabs.executeScript({
			file: 'js/rewind.js'
		});
	}
})();