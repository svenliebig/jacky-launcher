const { remote } = require('electron');

import { Suggestion } from './suggestion';

const EXIT = /^exit$/;
const SUGDOM = document.querySelector('#suggestions');


const ONE = /^one$/;
const TEN = /^ten$/;

export class Launcher {
	//

    constructor(app, input) {
		/** Declaration for nested functions */
		self = this;

		/** Logger */
		this.log = remote.getGlobal('logger');
		this.log.info("Launcher - Contructor() - Start");

		this.app = app;
		this.input = input;
		this.suggestions = [];
		this.selection = 0;

		input.onkeydown = (e) => {
			this.log.debug("Launcher - Keydown() - ", { 'key': e.key, 'keyCode': e.keyCode, 'code': e.code, 'charCode': e.charCode });

			if(e.keyCode == 13) {
				this.executeQuery(e.target.value);
			}

			self.query(e.target.value + e.key, e.ctrlKey, e.altKey);
		};

		this.log.info("Launcher - Contructor() - End");
    }

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

		this.render();
	}

	executeQuery(val) {
		this.log.debug("Launcher - executeQuery(val)", { val: val });
		if(val.match(EXIT)) {
			this.exit();
		} else if(val.match(ONE)) {
			this.oneTest();
		}
	}

	exit() {
		this.log.debug("Launcher - Exit()");
		this.app.window.close();
	}

	oneTest() {
		this.app.window.setSize(700, 400, true);
	}

	render() {
		let width = 600;
		let height = 100;
		height += 100 * (this.suggestions.length <= 5 ? this.suggestions.length : 5);

		SUGDOM.innerHTML = "";

		for (let i = 0; i < this.suggestions.length; i++) {
			let suggestion = this.suggestions[i];
			this.log.info("suggestion: ", suggestion);
			SUGDOM.append(suggestion.getElement());
		}

		this.app.window.setSize(width, height, true);
	}
}
