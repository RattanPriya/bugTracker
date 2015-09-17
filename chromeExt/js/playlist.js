window.onload = init();
function init() {
	document.getElementById("play_clicks").onclick = function() {
		document.getElementsByTagName("ol")[0].style.visibility = "visible"
		var data = queue;	
		for (var i = 0; i < queue.length; i++ ) {
			var click = queue[i];
			console.log(document.elementFromPoint(click.X, click.Y));		
		}
	
	}	
}
