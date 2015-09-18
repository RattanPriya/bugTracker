// Here You can type your custom JavaScript...
//debugger;

function Queue(){
    this.queue = [];
}

var queue = new Queue();

if (window == top) {
  window.addEventListener('click', doSendQueueDataToExtension, false); 
}

function doSendQueueDataToExtension(){
  if (queue.queue.length > 0){
    JSON.stringify(queue.queue);
    chrome.extension.sendRequest({queue: queue.queue});
  }
}

chrome.runtime.onMessage.addListener(
    function(request, sender) {
        JSON.stringify(queue);
    });

var QUEUE_SIZE = 30;

var dataDump = document.createElement("div");
dataDump.setAttribute("id", "data_dump");
dataDump.setAttribute("style", "visibility: hidden");
 document.getElementsByTagName("body")[0].appendChild(dataDump)

document.onclick = function(e) {

  var value = '';
  var text = '';
  var id = '';
  if(getCookie() == undefined){
    setCookie("cname",1)
  } else{
    var value = getCookie("cname").split('&')[0];
    var dateString = getCookie("cname").split('&')[1];
    var date = new Date(dateString);
    var currentDate = new Date();
    if(currentDate > date){
      setCookie("cname",parseInt(value) + 1);
    }
  }

    if($(e.target).is('a')){
       text = $(e.target).html();
    } else if(text == '') {
       text = $(e.target).closest("div").siblings("span").text();
    }

    if($(e.target).parent().closest('div[id]') != '' &&
    $(e.target).parent().closest('div[id]') != 'undefined'){
      id = $(e.target).parent().closest('div[id]')[0]? $(e.target).parent().closest('div[id]')[0].id : 'none';
    }

    var click = {
        X: e.pageX,
        Y: e.pageY,
        time: e.timeStamp,
        error: false,
        classname: e.target.className,
        id: e.target.id,
        uri: e.currentTarget.baseURI,
        closesttext: text,
        sessionid: value
    }

    if (id!=='none') {
          click.id = id;
    }

    console.log(click);
    
    if (queue.queue.length < QUEUE_SIZE) {
        queue.queue.push(click);
        var node = document.createElement("div");                 // Create a <li> node
        var textnode = document.createTextNode(JSON.stringify(click));         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("data_dump").appendChild(node)

    } else {
        queue.queue.shift(1);
        queue.queue.push(click);
    }

}

function getCookie(cname) {
    var name = cname + "=";
    var cookiearray = document.cookie.split(';');
    for(var i=0; i<cookiearray.length; i++){
        var key = cookiearray[i].split('=')[0];
        var value = cookiearray[i].split('=')[1];
        if (key.trim() == "cname"){
        return value;
        }
    }
}

function setCookie(cname, cvalue) {
    var d1 = new Date ();
    d2 = new Date ( d1 );
    d2.setMinutes ( d1.getMinutes() + 5 );
    document.cookie = cname + "=" + cvalue + "&" + d2;
}

var jsonData =
{
  "className": "top",
  "children": [
    {
      "pageX": "1022",
      "pageY": "216",
      "uri": "http://www.yelp.com/",
      "className": "star-img stars_4",
      "count": 2,
      "children": [
        {
          "pageX": "1022",
          "pageY": "219",
          "uri": "http://www.yelp.com/",
          "className": "star-img stars_4",
          "count": 1,
          "children": [
            {
              "pageX": "1022",
              "pageY": "219",
              "uri": "http://www.yelp.com/",
              "className": "star-img stars_4",
              "count": 1,
              "children": [
                {
                  "pageX": "1022",
                  "pageY": "219",
                  "uri": "http://www.yelp.com/",
                  "className": "star-img stars_4",
                  "count": 1,
                  "children": [
                    {
                      "pageX": "1022",
                      "pageY": "219",
                      "uri": "http://www.yelp.com/",
                      "className": "star-img stars_4",
                      "count": 1,
                      "children": [
                        {
                          "pageX": "1022",
                          "pageY": "219",
                          "uri": "http://www.yelp.com/",
                          "className": "star-img stars_4",
                          "count": 1,
                          "children": [
                            {
                              "pageX": "558",
                              "pageY": "686",
                              "uri": "http://www.yelp.com/",
                              "className": "star-img stars_5",
                              "count": 1,
                              "children": [
                                {
                                  "pageX": "350",
                                  "pageY": "703",
                                  "uri": "http://www.yelp.com/",
                                  "className": "category-title",
                                  "count": 1,
                                  "children": [
                                    {
                                      "pageX": "301",
                                      "pageY": "775",
                                      "uri": "http://www.yelp.com/",
                                      "className": "category-title",
                                      "count": 1,
                                      "children": [
                                        {
                                          "pageX": "317",
                                          "pageY": "820",
                                          "uri": "http://www.yelp.com/",
                                          "className": "category-title",
                                          "count": 1,

                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "pageX": "319",
      "pageY": "144",
      "uri": "http://www.yelp.com/biz/greenhearts-family-farm-csa-san-francisco",
      "className": "star-img stars_5",
      "count": 1,
      "children": [
        {
          "pageX": "353",
          "pageY": "149",
          "uri": "http://www.yelp.com/biz/greenhearts-family-farm-csa-san-francisco",
          "className": "star-img stars_5",
          "count": 1,
          "children": [
            {
              "pageX": "664",
              "pageY": "65",
              "uri": "http://www.yelp.com/biz/greenhearts-family-farm-csa-san-francisco",
              "className": "header-nav_link",
              "count": 1,
              "children": [
                {
                  "pageX": "391",
                  "pageY": "55",
                  "uri": "http://www.yelp.com/biz/greenhearts-family-farm-csa-san-francisco",
                  "className": "header-nav_link",
                  "count": 1,
                  "children": [
                    {
                      "pageX": "317",
                      "pageY": "856",
                      "uri": "http://www.yelp.com/",
                      "className": "category-title",
                      "count": 1,
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "pageX": "469",
      "pageY": "51",
      "uri": "http://www.yelp.com/",
      "className": "header-nav_link",
      "count": 1,
      "children": [
        {
          "pageX": "695",
          "pageY": "167",
          "uri": "http://www.yelp.com/chicago",
          "className": "embossed-text-white",
          "count": 1
        }
      ]
    }
  ]
}

function generateData(objData){
    var coords = [];
    while(objData.children){
        var coord =
        {
            name : objData.children[0].name,
            pageX : objData.children[0].pageX,
            pageY : objData.children[0].pageY
        };
        coords.push(coord);
        objData = objData.children[0];
    }
    return coords;
}

(function fakeBugGenerator() {
    debugger;
    var bugButton = document.createElement("button");
    bugButton.setAttribute("class","bugTracker");
    document.getElementsByTagName("body")[0].appendChild(bugButton);

    var dialogMessage = document.createElement("div");
    dialogMessage.setAttribute("id", "dialog");
    dialogMessage.setAttribute("title", "Aww Snap! Error");

    var dialogBody = document.createElement("div");
    dialogBody.setAttribute("class","ui-state-default");
    dialogBody.innerText ="Hey!";
    
    dialogMessage.appendChild(dialogBody);
    document.getElementsByTagName("body")[0].appendChild(dialogBody);


    var dialogBody = document.createElement("div");
    $( ".bugTracker" ).click(function() {
          
        alert( "Handler for .click() called." );
         $(function() {
            $( "#dialog" ).dialog();
        });
    });
})()

function onError() {
    debugger;
//    queue[queue.length - 1].error = true;
    var dialogMessage = document.createElement("div");
    dialogMessage.setAttribute("id", "dialogMessage");
    dialogMessage.setAttribute("title", "Aww Snap! Error");

    var dialogBody = document.createElement("div");
    dialogBody.setAttribute("class","ui-state-default");
    dialogBody.innerText ="Hey!";
    
    dialogMessage.appendChild(dialogBody);
    document.getElementsByTagName("body")[0].appendChild(dialogBody);


    $("#dialog-message").dialog({
        modal: true,
        draggable: false,
        resizable: false,
        position: ['center', 'top'],
        show: 'blind',
        hide: 'blind',
        width: 400,
        dialogClass: 'ui-dialog-osx',
        buttons: {
            "I've read and understand this": function() {
                $(this).dialog("close");
            }
        }
    });
}

