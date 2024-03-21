function injectCSS(context: string) {
  const style = document.createElement('style')
  style.type = 'text/css'

  style.appendChild(document.createTextNode(context))

  const head = document.getElementsByTagName('head')[0]
  head.appendChild(style)
}

// Get the count value from Chrome storage
chrome.storage.sync.get(['hideSider'], function (result) {
  const hideSider = !!result.hideSider

  if (hideSider) {
    injectCSS(
      `aside {
            display: none !important;
          }

          @media screen and (min-width: 1380px) {
            .nodata .container {
              width: unset !important;
            }
          }
          `,
    )
  }
})

chrome.storage.sync.get(['hideLogin'], function (result) {
  const hideLogin = !!result.hideLogin

  if (hideLogin) {
    injectCSS(
      `.passport-login-tip-container {
            display: none !important;
          }
          `,
    )
  }
})
