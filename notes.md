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
- In order to get the 100 most recent items, pass in a query object of `{text: ''}`
- When defining and using a variable that is being set asynchronously, either use the variable inside the callback or return a promise as the variable and handle the promise when it resolves
- each historyItem has an id, title, visitCount, lastVisitTime, typedCount, and url
- I just need to load a script in the background page and only load the background page when the browser action is clicked

Stuck:

For some reason it's not clear how to manipulate the DOM of the popup itself which is what I want to change. I don't care about the actual page that the user is on. The popup is the only important thing to me. So the way I understand it the extension has a popup that is loaded when the browser action is clicked and there is also a background page that the extension has that is supposed to contain all the app level logic.

Unstuck:

Apparently the source of the confusion was that I was trying to use the background script that I defined in the manifest as an external script for the popup which didn't work. Instead I made a `popup.js` file and included it as a script tag and it worked fine. Moving ONN!

- Set the most recent history item title as the contents of a div
- Debugging chrome extensions: if you want to debug the popup or background page, you need to click on inspect popup from the right click menu of the browser action and that will bring up the right context to debug from
- The last todo for today is getting the most visited link within the past 100 history items
- All I need to do is sort the array by visited and return the first result
- try it in the console and then use it in the actual code

3/15

- In order to return the result with the highest visitCount I need to sort the objects by the visitcount
- In order to sort an array of object by a property, I need to call sort on the array and pass in a callback that compares each value with the next value
- Sort Functions
  - I have an array of values [5, 2, 3, 4, 1] that I want to order
  - first I want to iterate through the array and compare each value to the one at the next index:
  ```js
  function partialSort(array){
    for(var i = 0; i < array.length - 1; i++){
      if(array[i] > array[i + 1]){
        var temp = array[i]
        array[i] = array[i + 1]
        array[i + 1] = temp
      }
    }
  }
  // will modify argument of [5, 2, 3, 4, 1] to [2, 3, 4, 1, 5]
  ```
  - set a flag called sorted and run a while loop when it is false
  - set the flag to true and only change it back to false if any swaps were made:
    ```js
    function fullSort(array){
      var sorted = false
      while(!sorted){
        sorted = true
        for(var i = 0; i < array.length - 1; i++){
          if(array[i] > array[i + 1]){
            sorted = false
            var temp = array[i]
            array[i] = array[i + 1]
            array[i + 1] = temp
          }
        }
      }
    }
    ```
  - Nice! This works and it's not that complicated. The only thing is that it will take forever to run on very large datasets so I should probably only use it for smaller things
- To log an array on separate lines I made a little function:
  ```js
  function logSeparately(arr){
    arr.forEach((i) => {console.log(i)})
  }
  ```
- I can add to this function to log out out the values of specific key by adding an parameter:
```js
function logSeparately(arr, key){
  arr.forEach((i) => {console.log(i[key])})
}
```
- So indeed I can sort an array of objects by the numerical value of a specific property by using `Array.prototype.sort` and passing in a compare function that will return the difference of the value of the property which will evaluate to a positive or negative number:
```js
function compare(a, b){
  return a.property - b.property
}
```
- In my case I want to sort by visitCount so the whole thing will look like this:
```js
historyItems.sort((a, b) => {
  return a.visitCount - b.visitCount
})
```
- The problem here is that the way this sort works it can only sort in ascending order because we are subtracting in order to see if it's a positive or negative number
- The easy solution is to just get the last item in the array which will be the highest value
- Now to put the link in the div with jquery simple, just add it to the html of the div and interpolate the properties
