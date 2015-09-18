var queue = [];

chrome.extension.onRequest.addListener(function(request, sender) 
{
	var queue = request.queue;
	debugger;
	var list = document.getElementById("class-list");
	/*list.textContent = '';*/
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
	returnMessage(request.message);
});

function returnMessage(messageToReturn)
{
	chrome.tabs.getSelected(null, function(tab) {
		var joinedMessage = messageToReturn + backgroundScriptMessage;		
		chrome.tabs.sendMessage(tab.id, {message: joinedMessage});
	});
}
