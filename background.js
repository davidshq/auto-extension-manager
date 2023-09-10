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
const processTabUpdated = async (changeInfo, tab) => {
  console.log('A tab update has occurred, processing...');
  if (tab.url) {
    actOnExtensions(tab);
  }
}

// Triggered whenever tab in a window changes
const processTabActivated = async (activeInfo) => {
  console.log('A tab has been activated, processing...');
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    actOnExtensions(tab);
  })
}

// If domain is prohibited, disable it, otherwise enable
const actOnExtensions = async (tab) => {
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
  // Strip http://, subdomain, etc. from URL to get base domain
  if (!url) {
    return;
  }
  url = new URL(url).hostname;
  console.log(url);
  // Compare current tab url to urls in selected sites
  for (const selectedSite of selectedSites) {
    console.log(selectedSite);
    if (selectedSite.startsWith('*.')) {
      let trimmedSelectedSite = selectedSite.replace(/^\*\./, '');
      if (url.endsWith(trimmedSelectedSite)) {
        console.log('Domain is on prohibited list');
        return true;
      }
    } else {
      console.log(url, selectedSite);
      if (url == selectedSite) {
        console.log('Domain is on prohibited list');
        return true;
      }
    }
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

// Fires when a tab is updated, e.g. its title or url change
chrome.tabs.onUpdated.addListener(processTabUpdated);
// Fires when the active tab in a window changes
chrome.tabs.onActivated.addListener(processTabActivated);
