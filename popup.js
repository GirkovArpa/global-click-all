'use strict';

const $ = document.querySelector.bind(document);

chrome.runtime.sendMessage({ message: 'get' }, response => {
  $('#selector').value = response.selector;
});

$('#selector').addEventListener('input', () => {
  const selector = $('#selector').value;
  chrome.runtime.sendMessage({ message: 'setSelector', selector });
});

$('#click').addEventListener('click', () => {
  chrome.runtime.sendMessage({ message: 'clickAll' });
  window.close();
});

document.addEventListener('keypress', function (e) {
  if (e.keyCode == 13) {
    chrome.runtime.sendMessage({ message: 'clickAll' });
    window.close();
  }
});