import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
import { header } from './header';

const main = document.querySelector('#main');

// Create a new div element to hold the header text
const headerDiv = document.createElement('div');
headerDiv.innerHTML = header;

// Append the new div element to the main element
main.appendChild(headerDiv);

// Clear the contents of the main element
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner" />
    </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
