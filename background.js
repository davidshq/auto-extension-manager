let extensionsToDisable = [];
let selectedSites = [];

// Get list of extensions to disable
const getExtensionsToDisable = () => {
  console.log('getExtensionsToDisable');
  // Get all the items in Chrome storage
  chrome.storage.sync.get((items) => {
    // Keep the list of extensions we don't want
    extensionsToDisable = items.excludedExtensions;
    console.log('Selected Extensions: ', extensionsToDisable);
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
      return;
  }
  console.log('URL: ', tab.url);
  // Check if site is in our list of sites to disable extensions for
  if (isDomainProhibited(tab.url)) {
    // Get list of extensions to disable
    extensionsToDisable.forEach((extension) => {
      disableExtension(extension, false);
    });
  } else {
    extensionsToDisable.forEach((extension) => {
      disableExtension(extension, true);
    });
    console.log('Not in list of sites to disable extensions for');
  }
}

// Check if a specific url is in list of domains to disable extensions for
const isDomainProhibited = (url) => {
  console.log('isDomainProhibited');
  // Strip http://, subdomain, etc. from URL
  url = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
  console.log(url);
  // Compare current tab url to urls in selected sites
  if (selectedSites.includes(url)) {
    console.log('Domain in list of sites to disable extensions for');
    return true
  }
}

// Disable or enable a specific extension
const disableExtension = (extensionId, enabled) => {
  console.log('Extension ID: ', extensionId);
  chrome.management.setEnabled(extensionId, enabled, () => {
    // TODO: Add error handling
    console.log('Extension Disabled');
  });
}

getExtensionsToDisable();
getSitesToDisableExtensionsFor();
chrome.tabs.onUpdated.addListener(processTabUpdate);
