
export class Action {

    constructor(trigger, action) {
        this.trigger = trigger;
        this.action = action;
	}

	setAction(func) {
        this.action = func;
	}
}
