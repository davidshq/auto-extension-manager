// Log to console a list of all browser extensions
const getExtensions = async (tabId, changeInfo, tab) => {
    console.log('Updated to URL:', tab.url)
    let extensions = await chrome.management.getAll();
    console.log(extensions);
}

chrome.tabs.onUpdated.addListener(getExtensions);