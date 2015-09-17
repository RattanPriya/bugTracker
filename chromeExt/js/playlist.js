window.onload = Player();

function Player() {
	this.state = ['stop', 'play', 'pause'];

	function init() {
		document.getElementById("play_clicks").onclick = function() {
			this.state = togglePlay();
			var data = queue;	
			var list = document.getElementById("click-list");
			list.textContent = '';

			for (var i = queue.length-1; i >= 0; i-- ) {
				var click = queue[i];
				var item = document.createElement("li");
				//<li>Blessing it <span class="time">3:24</span></li>
		        var textnode = document.createTextNode(click.X + " " +click.Y);
		        item.appendChild(textnode);         
		        list.appendChild(item);                     
		        console.log(document.elementFromPoint(click.X, click.Y));		
			}
		
		}	

	}

	function setState() {
		this.state = !this.state;
		return this.state;
	}

};
