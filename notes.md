3/13

- Create the skeleton from scratch
- add whatever I need after
- Determine the mvp or basics of what the extension will do
- for now it will retrieve the history of the previous day/week/year and display the top visited site
- Try to write the js in react, it shouldn't be that much different than writing a regular web app that I've done before

Following the [thoughtbot tutorial](https://robots.thoughtbot.com/how-to-make-a-chrome-extension)
- manifest.json is the only basic requirement and then a webpage that is loaded from that file
- adding a js script to the file is simple, just add it to the manifest file with the key `"content scripts"` which can define a key of matches which will inject the script into all pages that match the value in my case i want to inject the script on `"<all urls>"`, maybe in the future I want to match a certain url that pertains to the history of the browser.
- The content script is only able to access the DOM and not the apis that we really want to work with, so we need to send a message to the higher level extension to get certain information
- For example if the user clicks on the browser action, our content script will not know about it because it is not really happening on our page, it's happening in the browser on a higher level
- Message passing allows our content script to communicate with the rest of the extension
- we can send a message from the extension to the content script by calling `chrome.tabs.sendMessage` from a background script that we define in the `manifest.json`
- we can add a listener by calling `chrome.runtime.onMessage.addListener` and we can then define a callback which will fire when one page receives the message from the other

Following the [smashing magazine tutorial](https://www.smashingmagazine.com/2014/11/creating-save-later-chrome-extension-modern-web-tools/):

- Using Yeoman to generate the chrome extension scaffold
- `npm install -g yo`
- `npm install -g generator-chrome-extension`
- run `yo chrome-extension` and select browser action and content scripts
- add dependencies to bower file and change the scripts directory in the `manifest.json` to scripts.babel
- I need to Learn Angular

3/14

- Interact with the history API
- get any type of data to log to the console
- In order to use the history API the permission of history must be added to the manifest
- history API docs - https://developer.chrome.com/extensions/history
- To get history items we use the search method which takes in a query object and a callback function
- In order to get the 99 most recent items, pass in a query object of `{text: ''}`
