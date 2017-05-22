// log4j
import './lib/log4javascript/log4javascript.js';

const log = log4javascript.getDefaultLogger();
log.removeAllAppenders();
log.addAppender(new log4javascript.BrowserConsoleAppender());
log.info("message[, message2, ... ][, exception]");

// Small helpers you might want to keep
import './helpers/context_menu.js';
import './helpers/external_links.js';

// All stuff below is just to show you how it works. You can delete all of it.
import { remote } from 'electron';
import jetpack from 'fs-jetpack';
import { Launcher } from './launcher/launcher';
import env from './env';

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files form disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read('package.json', 'json');

const osMap = {
  win32: 'Windows',
  darwin: 'macOS',
  linux: 'Linux',
};

const commandLine = document.querySelector('input');

/**
document.querySelector('#greet').innerHTML = greet();
document.querySelector('#os').innerHTML = osMap[process.platform];
document.querySelector('#author').innerHTML = manifest.author;
document.querySelector('#env').innerHTML = env.name;
document.querySelector('#electron-version').innerHTML = process.versions.electron; */

let launcher = new Launcher(app, commandLine);

app.window.on('show', () => {
	console.log('mainWindow > event > show');
	commandLine.focus();
	commandLine.setSelectionRange(0, commandLine.value.length);
});
