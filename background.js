chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tab) => {
      console.log('Updated to URL:', tab.url)
    }
  )