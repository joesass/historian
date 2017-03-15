$('#get-links').click(function(){
  chrome.history.search({text: ''}, function(historyItems){
    historyItems.sort((a, b) => a.visitCount - b.visitCount)
    // .filter(() => {})
    var topItem = historyItems[99]
    $('.top-history-item').html(`<a target="_blank" href="${topItem.url}">${topItem.title}</a>`)
  })
})
