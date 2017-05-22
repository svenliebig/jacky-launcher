
export class Suggestion {

    constructor(title) {
		this.title = title;
		this.description = "description";
		this.icon = "512x512.png";
		this.action = "action";
	}

	getElement() {
		let div = document.createElement("div");
		div.className = "suggestion";

		let title = document.createElement("h1");
		title.innerHTML = this.title;

		let description = document.createElement("span");
		description.innerHTML = this.description;

		let image = document.createElement("img");
		image.src = "images/" + this.icon;
		div.append(image);
		div.append(title);
		div.append(description);

		return div;
	}
}
