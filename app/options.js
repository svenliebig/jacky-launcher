(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jetpack = _interopDefault(require('fs-jetpack'));

// Simple wrapper exposing environment variables to rest of the code.

// The variables have been written to `env.json` by the build process.
const env = jetpack.cwd(__dirname).read('env.json', 'json');

// enviroment
// logger
const { remote } = require('electron');
const logger = remote.getGlobal('logger');

// All stuff below is just to show you how it works. You can delete all of it.
const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

logger.info('Options - Loaded()');

document.querySelector('#directory').innerHTML = appDir;

}());
//# sourceMappingURL=options.js.map