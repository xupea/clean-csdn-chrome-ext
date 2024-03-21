import './index.css'

document.addEventListener('DOMContentLoaded', () => {
  const siderStatus = document.getElementById('siderStatus')
  const loginStatus = document.getElementById('loginStatus')

  let hideSider = true
  let hideLogin = true

  // Get the count value from Chrome storage
  chrome.storage.sync.get(['hideSider'], function (result) {
    hideSider = !!result.hideSider
    siderStatus!.style.visibility = hideSider ? 'visible' : 'hidden'
  })

  chrome.storage.sync.get(['hideLogin'], function (result) {
    hideLogin = !!result.hideLogin
    loginStatus!.style.visibility = hideLogin ? 'visible' : 'hidden'
  })

  const siderBtn = document.getElementById('siderBtn')
  const loginBtn = document.getElementById('loginBtn')

  siderBtn?.addEventListener('click', async () => {
    hideSider = !hideSider
    siderStatus!.style.visibility = hideSider ? 'visible' : 'hidden'
    await chrome.storage.sync.set({ hideSider })

    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true })
    // await chrome.tabs.sendMessage(activeTab.id!, { hideSider })
    chrome.runtime.sendMessage({ id: activeTab.id!, hideSider })
  })

  loginBtn?.addEventListener('click', async () => {
    hideLogin = !hideLogin
    loginStatus!.style.visibility = hideLogin ? 'visible' : 'hidden'
    await chrome.storage.sync.set({ hideLogin })

    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true })
    // await chrome.tabs.sendMessage(activeTab.id!, { hideLogin })
    chrome.runtime.sendMessage({ id: activeTab.id!, hideLogin })
  })
})
