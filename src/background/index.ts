console.log('background is running')

chrome.runtime.onMessage.addListener((request) => {
  chrome.tabs.reload(request.id)
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    let url = new URL(tab.url!)
    let domain = url.hostname

    if (domain === 'blog.csdn.net') {
      // 启用弹出页
      chrome.action.setPopup({
        tabId: tabId,
        popup: 'popup.html', // 指定你的弹出页面
      })
    } else {
      // 禁用弹出页，可以设置为空字符串或不设置popup属性
      chrome.action.setPopup({
        tabId: tabId,
        popup: '', // 禁用弹出页面
      })
    }
  }
})
