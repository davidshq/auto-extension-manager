# Auto Extension Manager

NOTE: This plugin is being actively developed, it is not ready for use.

## Goal

To create a browser plugin that allows users to select one or more plugins that should 
be disabled when the browser opens one of a user selected list of domains.

## What It Does Now
- Triggers when a tab is updated (but only proceeds if URL has changed)
- Gets a list of installed extensions
- Log the list of installed extensions to the console
- Checks if the changed url is in the list of domains to disable extensions for
- Disables an extension

## Tasks

### Major
- None At the Moment

### Tidying
- None At the Moment

### Questions
- None at the Moment

### Future Iteration
- Allow groups of extensions to be created.
- Allow multiple domain lists to be created.
- Allow groups of extensions to be paired with specific domain lists so that not all plugins need be disabled on all sites whenever a block listed site is encountered.
- Consider using Plasmo framework for browser independence.

## Resources

### AI
- GitHub Copilot
  - Including the Chat extension.

### Documentation
- [Chrome Extension API](https://developer.chrome.com/docs/extensions/reference/):
    - [chrome.management](https://developer.chrome.com/docs/extensions/reference/management/)
    - [chrome.tabs](https://developer.chrome.com/docs/extensions/reference/tabs/)
- [Give users options](https://developer.chrome.com/docs/extensions/mv3/options/)

### Blogs
- [How to Write a Chrome Extension](https://nrogap.medium.com/how-to-write-a-chrome-extension-b81218954c7c)
