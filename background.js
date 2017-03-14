// When user clicks on the browser action, call the function
chrome.browserAction.onClicked.addListener(function(tab){
  // send a message to the active tab
  // first argument is an object
  // second is a callback for when we get a response
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    // we query the tabs api for the active tab and use that in the callback
    var activeTab = tabs[0]
    chrome.tabs.sendMessage(activeTab.id, { "message": "clicked browser action"})
  })
})

// Listen for a message from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if (request.message == 'open_new_tab') {
    chrome.tabs.create({ "url": request.url })
  }
})
