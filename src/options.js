// enviroment
import env from './env';

// logger
const { remote } = require('electron');
const logger = remote.getGlobal('logger');

// All stuff below is just to show you how it works. You can delete all of it.
import jetpack from 'fs-jetpack';

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());
const userDataDir = jetpack.cwd(app.getPath('userData'));

let restoredState = {};
const stateStoreFile = 'preferences.json';

try {
    restoredState = userDataDir.read(stateStoreFile, 'json');
    global.logger.info('window - state restored');
} catch (err) {
    // For some reason json can't be read (might be corrupted).
    // No worries, we have defaults.
    logger.error('window - state could not restore state');
}

import { Checkbox } from './options/checkbox';

let checkbox = new Checkbox('Color');

document.querySelector('.tab-content').append(checkbox.getElement());


document.querySelector('#save').innerHTML = env.save;
document.querySelector('#close').innerHTML = env.close;

// userDataDir.write(stateStoreFile, state, {atomic: true});

logger.info('Options - Loaded()');

logger.info('Options - AppDir()', {appdir: appDir});
