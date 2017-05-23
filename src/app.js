// enviroment
import env from './env';

// logger
const { remote } = require('electron');
const logger = remote.getGlobal('logger');

// Small helpers you might want to keep
import './helpers/context_menu.js';
import './helpers/external_links.js';

// All stuff below is just to show you how it works. You can delete all of it.
import jetpack from 'fs-jetpack';
import { Launcher } from './launcher/launcher';

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files form disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read('package.json', 'json');

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
