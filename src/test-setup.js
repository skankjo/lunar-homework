const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const { window } = new JSDOM('<body><div id="root"></div></body>');
global.window = window;
global.document = window.document;
global.navigator = window.navigator;
window.localStorage = {};

