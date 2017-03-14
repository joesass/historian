chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if (request.message === 'clicked browser action') {
      var firstLink = $("a[href^='http']").eq(0).attr("href")

      console.log(firstLink)

      // send a message to the background script to open a new tab
      chrome.runtime.sendMessage({
        "message": "open_new_tab",
        "url" : firstLink
      })
    }
  }
)
