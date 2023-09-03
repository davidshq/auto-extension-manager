let selectedExtensions = [];
let selectedSites = [];

// Get list of extensions to disable
const getExtensionsToDisable = () => {
  console.log('getExtensionsToDisable');
  chrome.storage.sync.get((items) => {
    selectedExtensions = items.excludedExtensions;
    console.log('Selected Extensions: ', selectedExtensions);
  });
}

// Get list of sites to disable extensions for
const getSitesToDisableExtensionsFor = () => {
  console.log('getSitesToDisableExtensionsFor');
  chrome.storage.sync.get((items) => {
    selectedSites = items.selectedWebsites;
  });
}

// Triggered whenever a tab is updated
const processTabUpdate = async (tabId, changeInfo, tab) => {
  console.log('processTabUpdate');
  // We only need to take action if the URL has changed, return otherwise
  if (!changeInfo.url) {
      console.log('No URL change');
      return;
  }
  console.log('URL: ', tab.url);
  // Check if site is in our list of sites to disable extensions for
  if (isDomainProhibited(tab.url)) {
    // Get list of extensions to disable
    selectedExtensions.forEach((extension) => {
      disableExtension(extension);
    });
  } else {
    console.log('Not in list of sites to disable extensions for');
  }
}

// Check if a specific url is in list of domains to disable extensions for
const isDomainProhibited = (url) => {
  console.log('isDomainProhibited');
  // Strip http://, subdomain, etc. from URL
  url = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
  console.log(url);
  if (selectedSites.includes(url)) {
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

getExtensionsToDisable();
getSitesToDisableExtensionsFor();
chrome.tabs.onUpdated.addListener(processTabUpdate);
