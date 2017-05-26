import { globalShortcut } from 'electron';
import { Suggestion } from './suggestion';
import { Action } from './action';
import env from '../env';

const { remote } = require('electron');

const EXIT = /^exit$/;
const SUGDOM = document.querySelector('#suggestions');

const osMap = {
  win32: 'Windows',
  darwin: 'macOS',
  linux: 'Linux',
};

const OS = osMap[process.platform];

const ONE = /^one$/;
const TEN = /^ten$/;

const KEY_TAB = 9;
const KEY_ENTER = 13;
const KEY_BACKSPACE = 19;
const KEY_CAPSLOCK = 20;
const KEY_ARROW_LEFT = 37;
const KEY_ARROW_UP = 38;
const KEY_ARROW_RIGHT = 39;
const KEY_ARROW_DOWN = 40;
const KEY_SHIFT_LEFT = 16;
const KEY_CTRL_LEFT = 17;
const KEY_ALT_LEFT = 18;

const KEY_MACOS_CMD_LEFT = 91;
const KEY_MACOS_CMD_RIGHT = 93;

let openOptions = new Action(['options', 'preferences'], () => {
    const app = remote.app;
    remote.getGlobal('logger').info('Action - Options - Triggered');
    app.options.show();

	if (env.name === 'development') {
		app.options.openDevTools();
	}
});

let actionsArray = [openOptions];

export class Launcher {


    /**
     * constructor - description
     *
     * @param  {type} app   description
     * @param  {type} input description
     * @return {type}       description
     */
    constructor(app, input) {
		/** Declaration for nested functions */
		let self = this;

		/** Logger */
		this.log = remote.getGlobal('logger');
		this.log.info("Launcher - Contructor() - Start");

		this.macosCmdModifier = false;

		this.app = app;
		this.input = input;
		this.suggestions = [];
		this.actions = [];

		this.selection = 0;

		input.onkeydown = (e) => {
			self.onkeydown(e);
		};

		input.onkeyup = (e) => {
			self.onkeyup(e);
		}

		this.log.info("Launcher - Contructor() - End");
    }

	onkeydown(e) {
		this.log.debug("Launcher - Keydown() - ", { 'key': e.key, 'keyCode': e.keyCode, 'code': e.code, 'charCode': e.charCode });

		let character = e.key;
		let queryString = e.target.value;

		switch(e.keyCode) {
			case KEY_ENTER:
				this.executeQuery(e.target.value);
				break;
			case KEY_ARROW_UP:
				this.selectionUp();
				break;
			case KEY_ARROW_DOWN:
			case KEY_TAB:
				this.selectionDown();
				break;
			case KEY_SHIFT_LEFT:
			case KEY_CTRL_LEFT:
			case KEY_ALT_LEFT:
			case KEY_CAPSLOCK:
			case KEY_ARROW_LEFT:
			case KEY_ARROW_RIGHT:
				break;
			case KEY_MACOS_CMD_LEFT:
			case KEY_MACOS_CMD_RIGHT:
				this.macosCmdModifier = true;
				this.log.debug("Launcher - Keydown() - ", { macosCmdModifier: this.macosCmdModifier });
				break;
			case KEY_BACKSPACE:
				character = '';
				queryString = queryString.slice(0, queryString.length - 1);
			default:
				this.query(queryString + character, e.ctrlKey, e.altKey, e.shiftKey);
				break;
		}

		this.render();
	}

	onkeyup(e) {
		switch(e.keyCode) {
			case KEY_MACOS_CMD_LEFT:
			case KEY_MACOS_CMD_RIGHT:
				this.macosCmdModifier = false;
				this.log.debug("Launcher - Keyup() - ", { macosCmdModifier: this.macosCmdModifier });
				break;
		}
	}

	/**
	 * query - description
	 *
	 * @param  {type} val    description
	 * @param  {type} ctrl   description
	 * @param  {type} alt    description
	 * @param  {type} shift_ description
	 * @return {type}        description
	 */
	query(val, ctrl, alt, shift_) {
		this.log.debug("Launcher - Query(val, ctrl, alt, shift)", { val: val, ctrl: ctrl, alt: alt, shift_: shift_ });

		this.suggestions = [];

		if(val.match(ONE)) {
			this.suggestions.push(new Suggestion("1"));
		} else if(val.match(TEN)) {
			for(let x = 0; x <= 10; x++) {
				this.suggestions.push(new Suggestion(x));
			}
		}
	}

	executeQuery(val) {
		this.log.debug("Launcher - executeQuery(val)", { val: val });
		if(val.match(EXIT)) {
			this.exit();
		} else if(val.match(ONE)) {
			this.oneTest();
		} else {
            for (var i = 0; i < actionsArray.length; i++) {
        		this.log.debug(`Launcher - actionsArray[${i}]`, { index: actionsArray[i] });
                if(actionsArray[i].trigger.indexOf(val) >= 0) {
            		this.log.debug(`Launcher - actionsArray[${i}].trigger.indexOf(${val})`, { result: actionsArray[i].trigger.indexOf(val) >= 0 });
                    actionsArray[i].action();
                }
            }
        }
	}

	exit() {
		this.log.debug("Launcher - Exit()");
		this.app.window.close();
	}

	render() {
		let width = 600;
		let height = 100;
		height += 100 * (this.suggestions.length <= 5 ? this.suggestions.length : 5);

		SUGDOM.innerHTML = "";

		for (let i = 0; i < this.suggestions.length; i++) {
			let suggestion = this.suggestions[i];
			this.log.info("suggestion: ", suggestion);
			let element = suggestion.getElement();
			element.className += (this.selection === i ? " selected" : "");
			SUGDOM.append(element);
		}

		this.app.window.setSize(width, height, true);
	}

	selectionDown() {
		this.log.debug('Launcher - selectionDown() - Start', { 'suggestions.length': this.suggestions.length, 'selection': this.selection });
		if (this.suggestions.length != 0) {
			if (this.selection < this.suggestions.length - 1) {
				this.selection += 1;
			} else if (this.selection === this.suggestions.length - 1) {
				this.selection = 0;
			}
		} else {
			this.selection = 0;
		}
		this.log.debug('Launcher - selectionDown() - End', { 'selection': this.selection });
	}

	selectionUp() {
		this.log.debug('Launcher - selectionUp() - Start', { 'suggestions.length': this.suggestions.length, 'selection': this.selection });
		if (this.suggestions.length != 0) {
			if (this.selection > 0) {
				this.selection -= 1;
			} else if (this.selection === 0) {
				this.selection = this.suggestions.length - 1;
			}
		} else {
			this.selection = 0;
		}
		this.log.debug('Launcher - selectionUp() - End', { 'selection': this.selection });
	}

	registerShortcuts() {
		const ret = globalShortcut.register('CommandOrControl+1', () => {
			global.logger.info('window - globalShortcut() - CommandOrControl+1');
			if (this.app.window.isVisible()) {
				global.logger.info('window - hide()', {isVisible: true});
			}
		});

		if (!ret) {
			global.logger.error('globalShortcut() - CommandOrControl+1 - registration failed!');
		}
	}
}
