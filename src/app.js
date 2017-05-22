// enviroment
import env from './env';


const { remote } = require('electron');
const logger = remote.getGlobal('logger');


// js-logger /src/lib/js-logger/src/logger.min.js

/*
import winston from './lib/winston/lib/winston';

logger.loglevel = "debug";
var logFolder = path.join(app.getPath("userData"), "logs");
var logFile = new Date().toISOString().replace(/:/g, '.') + '.log';
logger.add(logger.transports.File, { filename: path.join(logFolder, logFile) });
global.logger = logger;

const {remote} = require('electron');
//logger = remote.getGlobal('logger');

// log4j
/*
import './lib/log4javascript/log4javascript.js';

const appender = new log4javascript.BrowserConsoleAppender();
const layout = new log4javascript.PatternLayout("%m%n");
appender.setLayout(layout);

const log = log4javascript.getDefaultLogger();
log.removeAllAppenders();
log.addAppender(appender);
log.info('Enviroment: ', env.name);

switch(env.name) {
	case "development":
		log.setLevel(log4javascript.Level.DEBUG);
		log.debug('Log level: ', log4javascript.Level.DEBUG);
		break;
	case "production":
		log.setLevel(log4javascript.Level.OFF);
		break;
	case "test":
		log.setLevel(log4javascript.Level.OFF);
		break;
}*/

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
