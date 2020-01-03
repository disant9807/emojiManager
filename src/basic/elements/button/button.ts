import {style} from '../style'

export class Button {
	name: string;
	size: style.size;
	color: style.color;

	constructor(buttonName: string, buttonSize: style.size, buttonColor: style.color) {
		this.name = buttonName;
		this.size = buttonSize;
		this.color = buttonColor;
	}
}
