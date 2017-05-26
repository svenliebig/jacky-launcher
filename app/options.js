(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jetpack = _interopDefault(require('fs-jetpack'));

// Simple wrapper exposing environment variables to rest of the code.

// The variables have been written to `env.json` by the build process.
const env = jetpack.cwd(__dirname).read('env.json', 'json');

const { remote: remote$1 } = require('electron');
let logger$1 = remote$1.getGlobal('logger');

class Checkbox {
    constructor(title, value) {
        logger$1.info('Checkbox - contructor(title)', {title: title});
        this.title = title;
        this.value = (value ? value : false);
    }

    getElement() {
        logger$1.info('Checkbox - getElement()');
        let self = this;

        let container = document.createElement('div');
        let checkbox = document.createElement('input');
        let label = document.createElement('label');

        container.className = 'options-container checkbox-container';
        let checkboxId = `${this.title}-checkbox`;

        checkbox.id = checkboxId;
        checkbox.type = "checkbox";
        checkbox.onclick = (e) => {
            logger$1.info('Checkbox - element - OnClick(e)', { checked: e.target.checked });
            self.value = e.target.checked;
        };

        label.setAttribute('for', checkboxId);
        label.innerHTML = this.title;

        container.append(checkbox);
        container.append(label);

        return container;
    }
}

// enviroment
// logger
const { remote } = require('electron');
const logger = remote.getGlobal('logger');

// All stuff below is just to show you how it works. You can delete all of it.
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

let checkbox = new Checkbox('Color');

document.querySelector('.tab-content').append(checkbox.getElement());


document.querySelector('#save').innerHTML = env.save;
document.querySelector('#close').innerHTML = env.close;

// userDataDir.write(stateStoreFile, state, {atomic: true});

logger.info('Options - Loaded()');

logger.info('Options - AppDir()', {appdir: appDir});

}());
//# sourceMappingURL=options.js.map