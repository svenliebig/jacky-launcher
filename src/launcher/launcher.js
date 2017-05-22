export class Launcher {

    constructor(app, input) {
		self = this;

		this.app = app;
		this.input = input;

		input.onkeydown = (e) => {
			console.log(`Launcher > Keydown > ${e.key}`);
			console.debug(`Launcher > Keydown > ${e.key}`);

			if(e.keyCode == 13) {
				console.log("Launcher > Execute");
			}

			self.query(e.target.value + e.key, e.ctrlKey, e.altKey);
		};
    }

	query(val, ctrl, alt) {
		console.log('Launcher > Query > ' + val);

		if (val == 'exit') {
			this.exit();
		}
	}

	exit() {
		app.window.hide();
	}

}
