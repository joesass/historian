chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if (request.action === 'clicked browser action') {
      var historyItems = request.payload
    }
  }
)
