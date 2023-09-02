let checkedExtensions = [];

// Saves options to chrome.storage
const saveOptions = () => {
  chrome.storage.sync.set({
    excludeExtensions: checkedExtensions
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get({ excludedExtensions: [] }, (items) => {
    const excludedExtensions = items.excludedExtensions;
    const extensionList = document.getElementById('extension-list');
    if (!extensionList) {
      console.error('Extension list element not found');
      return;
    }
    chrome.management.getAll((extensions) => {
      createExtensionCheckboxes(extensions, excludedExtensions, extensionList);
    });
  });
};

// Creates the list of extensions and sets their state
const createExtensionCheckboxes = (extensions, excludedExtensions, extensionList) => {
  for (const extension of extensions) {
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
  }
};

document.addEventListener('DOMContentLoaded', restoreOptions);
