// Here You can type your custom JavaScript...


var queue = [];

var dataDump = document.createElement("div");
dataDump.setAttribute("id", "data_dump");
dataDump.setAttribute("style", "visibility: hidden");
 document.getElementsByTagName("body")[0].appendChild(dataDump)

document.onclick = function(e) {
    var click = {
        X: e.pageX,
        Y: e.pageY,
        time: e.timeStamp,
        error: false,
        id: ''
    }
    if (queue.length < 30) {
        queue.push(click);
        var node = document.createElement("div");                 // Create a <li> node
        var textnode = document.createTextNode(JSON.stringify(click));         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("data_dump").appendChild(node)
                
    } else {
        queue.shift(1);
        queue.push(click);
    }
    
}



