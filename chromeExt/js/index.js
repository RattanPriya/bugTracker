(function initialize() {

	document.getElementsByClassName('play')[0].onclick = function () {
		debugger;
		chrome.tabs.executeScript({
			file: 'js/playlist.js'
		});
	}
})();