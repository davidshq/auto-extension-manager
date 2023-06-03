// Log to console a list of all browser extensions
const getExtensions = async (tabId, changeInfo, tab) => {
    let extensions = await chrome.management.getAll();
    console.log('Installed Extensions: ', extensions);
    let extensionToDisable = extensions[0].id;
    return extensionToDisable;
}

const processTabUpdate = async (tabId, changeInfo, tab) => {
    console.log('URL: ', tab.url);
    const extensionToDisable = await getExtensions(tabId, changeInfo, tab);
    disableExtension(extensionToDisable);
}

const disableExtension = (extensionId) => {
    console.log('Extension ID: ', extensionId);
    chrome.management.setEnabled(extensionId, false, () => {
        // TODO: Add error handling
        console.log('Extension Disabled');
    });
}

chrome.tabs.onUpdated.addListener(processTabUpdate);

