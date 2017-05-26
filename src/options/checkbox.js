const { remote } = require('electron');
let logger = remote.getGlobal('logger');

export class Checkbox {
    constructor(title, value) {
        logger.info('Checkbox - contructor(title)', {title: title});
        this.title = title;
        this.value = (value ? value : false);
    }

    getElement() {
        logger.info('Checkbox - getElement()');
        let self = this;

        let container = document.createElement('div');
        let checkbox = document.createElement('input');
        let label = document.createElement('label');

        container.className = 'options-container checkbox-container';
        let checkboxId = `${this.title}-checkbox`;

        checkbox.id = checkboxId;
        checkbox.type = "checkbox";
        checkbox.onclick = (e) => {
            logger.info('Checkbox - element - OnClick(e)', { checked: e.target.checked });
            self.value = e.target.checked;
        };

        label.setAttribute('for', checkboxId);
        label.innerHTML = this.title;

        container.append(checkbox);
        container.append(label);

        return container;
    }
}
