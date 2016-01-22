The purpose of this app to track any user activity on any client. This can be a powerful tool for designers and PMs to make deicssions about how users interact with their apps. 
The gif demos our code against facebook as a client but technically we can use any client.
Once we gather all the metrics, we can put this data into any viz tool and find out interesting user behaviors.

In the gif below, you can see I click on bunch of places on my facebook account. After that, I can click on my chrome plugin to see where all I clicked. This is for demo purposes only. In realworld, a server would collect these metrics and data engineers can train from streams of data.
Using the Server
----------------
1. Need to install and run mongodb database
2. Install bower for client side dependencies `npm install -g bower`
3. Install server side dependencies with npm `npm install`
4. Install client side dependencies with bower `bower install`
5. Run the server on localhost:3000 `node server`
![alt tag](https://github.com/RattanPriya/bugTracker/blob/master/bugTracker.gif)
