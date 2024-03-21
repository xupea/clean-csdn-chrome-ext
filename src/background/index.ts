console.log('background is running')

chrome.runtime.onMessage.addListener((request) => {
  chrome.tabs.reload(request.id)
})
