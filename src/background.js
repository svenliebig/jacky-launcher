// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

import './helpers/logger';

import path from 'path';
import url from 'url';
import {
	app,
	Menu,
	BrowserWindow
} from 'electron';
import {
	devMenuTemplate
} from './menu/dev_menu_template';
import {
	editMenuTemplate
} from './menu/edit_menu_template';

import createWindow from './helpers/window';

const setApplicationMenu = () => {
	const menus = [editMenuTemplate];
	if (env.name !== 'production') {
		menus.push(devMenuTemplate);
	}
	Menu.setApplicationMenu(Menu.buildFromTemplate([]));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
	const userDataPath = app.getPath('userData');
	app.setPath('userData', `${userDataPath} (${env.name})`);
}

app.on('ready', () => {
	setApplicationMenu();

	let launcherWindow = createWindow('main', {
		width: 600,
		height: 100,
		frame: false,
		skipTaskbar: false,
		fullscreen: false,
		transparent: true,
		movable: true,
		resizable: false,
		alwaysOnTop: true,
		backgroundColor: '#2e2c29'
		// macos
		//titleBarStyle: 'hidden-inset'
	});

	let optionsWindow = new BrowserWindow({
		width: 600,
		height: 600,
		parent: launcherWindow,
		show: false,
		autoHideMenuBar: true,
		title: 'Preferences'
	});

	optionsWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'options.html'),
		protocol: 'file:',
		slashes: true,
	}));

	launcherWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app.html'),
		protocol: 'file:',
		slashes: true,
	}));

	launcherWindow.on('blur', () => {
		global.logger.info("window - blur()");
		launcherWindow.hide();
	});

	app.window = launcherWindow;
	app.options = optionsWindow;

	if (env.name === 'development') {
		launcherWindow.openDevTools();
	}
});

app.on('window-all-closed', () => {
	app.quit();
});
