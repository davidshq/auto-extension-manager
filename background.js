// Log to console a list of all browser extensions
const getExtensions = async (tabId, changeInfo, tab) => {
    let extensions = await chrome.management.getAll();
    console.log('Installed Extensions: ', extensions);
    // TODO: Remove this and instead have main process return user selected list
    let extensionToDisable = extensions[0].id;
    return extensionToDisable;
}

// Triggered whenever a tab is updated
const processTabUpdate = async (tabId, changeInfo, tab) => {
    // We only need to take action if the URL has changed, return otherwise
    if (!changeInfo.url) {
        console.log('No URL change');
        return;
    }
    console.log('URL: ', tab.url);
    // Check if site is in our list of sites to disable extensions for
    if (checkDomain(tab.url)) {
        // Get list of extensions to disable
        const extensionToDisable = await getExtensions(tabId, changeInfo, tab);
        disableExtension(extensionToDisable);
    } else {
        console.log('Not in list of sites to disable extensions for');
    }
}

// Check if a specific url is in list of domains to disable extensions for
const checkDomain = (url) => {
    const domains = ['https://www.google.com/', 'https://www.youtube.com/'];
    if (domains.includes(url)) {
        console.log('Domain in list of sites to disable extensions for');
        return true
    }
}

// Disable a specific extension
const disableExtension = (extensionId) => {
    console.log('Extension ID: ', extensionId);
    chrome.management.setEnabled(extensionId, false, () => {
        // TODO: Add error handling
        console.log('Extension Disabled');
    });
}

chrome.tabs.onUpdated.addListener(processTabUpdate);

