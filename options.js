let checkedExtensions = [];
let selectedWebsites = [];

// Saves options to chrome.storage
const saveOptions = () => {
  chrome.storage.sync.set({
    excludeExtensions: checkedExtensions,
    selectedWebsites: selectedWebsites
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get({ excludedExtensions: [], selectedWebsites: [] }, (items) => {
    const excludedExtensions = items.excludedExtensions;
    const extensionList = document.getElementById('extension-list');

    chrome.management.getAll((extensions) => {
      createExtensionCheckboxes(extensions, excludedExtensions, extensionList);
    });

    selectedWebsites = items.selectedWebsites.join('\n');

    const websiteList = document.getElementById('website-list');

    websiteList.addEventListener('change', () => {
      const selectedWebsites = websiteList.value.split('\n').filter((website) => website.trim() !== '');
      chrome.storage.sync.set({ selectedWebsites: selectedWebsites });
    })
    populateWebsites();
  });
};

const populateWebsites = () => {
  const websiteList = document.getElementById('website-list');
  websiteList.innerHTML = selectedWebsites;
}

// Creates the list of extensions and sets their state
const createExtensionCheckboxes = (extensions, excludedExtensions, extensionList) => {
  extensions.forEach((extension) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    checkbox.value = extension.id;

    if (excludedExtensions.includes(extension.id)) {
      checkbox.checked = true;
    }

    checkbox.addEventListener('change', () => {
      const checkedExtensions = Array.from(extensionList.querySelectorAll('input[type="checkbox"]:checked')).map((checkbox) => checkbox.value);
      chrome.storage.sync.set({ excludedExtensions: checkedExtensions });
    });

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(extension.name));
    extensionList.appendChild(li);
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
