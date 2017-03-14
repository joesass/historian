chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if (request.action === 'clicked browser action') {
      console.log('hello')
      var historyItems = request.payload
    }
  }
)
