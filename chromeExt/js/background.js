var queue = [];

chrome.extension.onRequest.addListener(function(request, sender) 
{
	var queue = request.queue;
	returnMessage(request.message);
});

function returnMessage(messageToReturn)
{
	chrome.tabs.getSelected(null, function(tab) {
		var joinedMessage = messageToReturn + backgroundScriptMessage;		
		chrome.tabs.sendMessage(tab.id, {message: joinedMessage});
	});
}
