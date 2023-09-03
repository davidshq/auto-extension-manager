let extensionsToDisable = [];
let selectedSites = [];

// Get list of extensions to disable
const getExtensionsToDisable = () => {
  console.log('Getting the list of extensions to disable');
  // Get all the items in Chrome storage
  chrome.storage.sync.get((items) => {
    // Keep the list of extensions we don't want
    extensionsToDisable = items.excludedExtensions;
    console.log('Selected Extensions: ', extensionsToDisable);
  });
}

// Get list of sites to disable extensions for
const getSitesToDisableExtensionsFor = () => {
  console.log('Getting the list of sites to disable on');
  chrome.storage.sync.get((items) => {
    selectedSites = items.selectedWebsites;
  });
}

// Triggered whenever a tab is updated
const processTabUpdate = async (tabId, changeInfo, tab) => {
  console.log('A tab update has occurred, processing...');
  // We only need to take action if the URL has changed, return otherwise
  if (!changeInfo.url) {
      return;
  }
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
  }
}

// Check if a specific url is in list of domains to disable extensions for
const isDomainProhibited = (url) => {
  console.log('Checking if domain is on prohibited list for select extensions');
  // Strip http://, subdomain, etc. from URL
  url = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
  console.log(url);
  // Compare current tab url to urls in selected sites
  if (selectedSites.includes(url)) {
    console.log('Domain is on prohibited list');
    return true
  }
}

// Disable or enable a specific extension
const disableExtension = (extensionId, enabled) => {
  console.log('Extension ID: ', extensionId);
  chrome.management.setEnabled(extensionId, enabled, () => {
    // TODO: Add error handling
    if (enabled) {
      console.log("Extension Enabled");
    } else if (enabled === false) {
      console.log("Extension Disabled");
    } else {
      console.log("Well, this is a bit embarrassing.");
    }
  });
}

getExtensionsToDisable();
getSitesToDisableExtensionsFor();
chrome.tabs.onUpdated.addListener(processTabUpdate);
