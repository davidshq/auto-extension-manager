# Auto Extension Manager

**DON'T USE, THIS HAS ISSUES THAT I DON'T HAVE TIME CURRENTLY TO RESOLVE.**

A browser extension that allows users to select one or more extensions that should 
be disabled when the browser opens one of a user selected list of domains.

## What It Does Now
- Triggered whenever a tab is updated (e.g. URL is changed)
- Checks a user configured list of domains to see if some extensions should be 
  disabled while tab is on one of those domains
- If tab is on a specified domain, then user selected list of extensions are disabled
- When a tab is no longer on a specified domain, extensions are re-enabled

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
