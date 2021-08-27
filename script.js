'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message == 'clickAll') {
    clickAll(request.selector);
    sendResponse({ message: 'done ' });
  }
});

function clickAll(selector) {
  const elements = [...document.querySelectorAll(selector)];
  console.log(`Clicking all ${elements.length} elements matching CSS selector << ${selector} >>.`);
  elements.forEach((element) => element.click());
}