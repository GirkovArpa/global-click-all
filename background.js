'use strict';

let selector = '';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case 'get':
      sendResponse({ selector });
      break;
    case 'setSelector':
      selector = request.selector;
      break;
    case 'clickAll':
      return clickAll();
      break;
  }
});

function clickAll() {
  new Promise(async resolve => {
    let tabList = [];
    chrome.windows.getAll({ populate: true }, windows => {
      windows.forEach(window => {
        window.tabs.forEach(tab => {
          tabList.push(tab);
        });
      });
      resolve(tabList);
    });
  }).then(tabList => {
    tabList.forEach(tab => chrome.tabs.sendMessage(tab.id, { message: 'clickAll', selector }));
  });
  return true; // this means its async
}

