import {style} from "../../basic/elements/style";

export interface ITableCell {
	content: any;
	getElement () : style.element;
	textColor : style.textColor;
	color: style.color;
	colorContent: style.color;
	actionName: string;
	style: Object;
	class: String [];
	indexTable: number [];
}

export class TableCell implements ITableCell {
	content: String = '';
	private element : style.element = style.element.div;
	textColor : style.textColor = style.textColor.body;
	color: style.color = style.color.transparent;
	colorContent: style.color = style.color.transparent;
	actionName: string = 'cell';
	style: Object = {};
	class: String [] = [];
	indexTable: number [];

	getElement(): style.element {
		return this.element
	}

	constructor(content: String){
		this.content = content;
	}
}

export class TableButtonCell implements ITableCell {
	content: String = '';
	private element : style.element = style.element.button;
	textColor : style.textColor = style.textColor.body;
	color: style.color = style.color.transparent;
	colorContent: style.color = style.color.success;
	actionName: string = 'button';
	style: Object = {};
	class: String [] = [];
	indexTable: number [];

	getElement(): style.element {
		return this.element
	}

	constructor(content: String){
		this.content = content;
	}
}

export class TableIconCell implements ITableCell {
	content: String = '';
	private element : style.element = style.element.img;
	textColor : style.textColor = style.textColor.body;
	color: style.color = style.color.transparent;
	colorContent: style.color = style.color.success;
	actionName: string = 'icon';
	style: Object = {
		'width': '24px',
		'height': '24px'
	};
	class: String [] = [];
	indexTable: number [];

	getElement(): style.element {
		return this.element
	}

	constructor(content: String){
		this.content = content;
	}
}

export class TableCellCells implements ITableCell {
	content: ITableCell [] = [];
	private element : style.element = style.element.repeat;
	textColor : style.textColor = style.textColor.body;
	color: style.color = style.color.transparent;
	colorContent: style.color = style.color.success;
	actionName: string = 'cellCell';
	style: Object = {
		'width': '24px',
		'height': '24px'
	};
	class: String [] = ['ml-1', 'mr-1'];
	indexTable: number [];

	getElement(): style.element {
		return this.element
	}

	constructor(content: ITableCell []){
		this.content = content;
	}
}

export class TableRow {
	cells : ITableCell [];
	color : style.color = style.color.transparent;
	textColor : style.textColor = style.textColor.body;

	constructor(cells : ITableCell[]) {
		this.cells = cells;
	}
}

export class TableColumn {
	content: String = '';
	textColor : style.textColor = style.textColor.body;
	color: style.color = style.color.transparent;
	private width: String;

	setWidth (width: number) {
		this.width = `${width}px`;
	}
	getWidth() : String {
		return this.width;
	}

	constructor(content) {
		this.content = content;
	}
}

export class Table {
	columns: TableColumn [] = [];
	rows: TableRow [] = [];


}
