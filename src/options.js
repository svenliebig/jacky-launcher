// enviroment
import env from './env';

// logger
const { remote } = require('electron');
const logger = remote.getGlobal('logger');

// All stuff below is just to show you how it works. You can delete all of it.
import jetpack from 'fs-jetpack';

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

logger.info('Options - Loaded()');

document.querySelector('#directory').innerHTML = appDir;
