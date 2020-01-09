import {style} from '../../basic/elements/style';

export interface ITableCell {
	content: any;

	getElement(): style.element;

	actionName: string;
	style: Object;
	class: String [];
	indexTable: number [];
}

export class TableCell implements ITableCell {
	content: String = '';
	private element: style.element = style.element.div;
	actionName: string = 'cell';
	style: Object = {};
	class: String [] = [];
	indexTable: number [];

	getElement(): style.element {
		return this.element;
	}

	constructor(content: String) {
		this.content = content;
	}
}

export class TableButtonCell implements ITableCell {
	content: String = '';
	private element: style.element = style.element.button;
	actionName: string = 'button';
	style: Object = {};
	class: String [] = [];
	indexTable: number [];

	getElement(): style.element {
		return this.element;
	}

	constructor(content: String) {
		this.content = content;
	}
}

export class TableIconCell implements ITableCell {
	content: String = '';
	private element: style.element = style.element.img;
	actionName: string = 'icon';
	style: Object = {
		'width': '24px',
		'height': '24px'
	};
	class: String [] = [];
	indexTable: number [];

	getElement(): style.element {
		return this.element;
	}

	constructor(content: String) {
		this.content = content;
	}
}

export class TableCellCells implements ITableCell {
	content: ITableCell [] = [];
	private element: style.element = style.element.repeat;
	actionName: string = 'cellCell';
	style: Object = {
		'width': '24px',
		'height': '24px'
	};
	class: string [] = ['ml-1', 'mr-1'];
	indexTable: number [];

	getElement(): style.element {
		return this.element;
	}

	constructor(content: ITableCell []) {
		this.content = content;
	}
}

export class TableRow {
	cells: ITableCell [];

	constructor(cells: ITableCell[]) {
		this.cells = cells;
	}

	class: string [] = ['ml-1', 'mr-1'];
}

export class TableColumn {
	content: String = '';

	constructor(content) {
		this.content = content;
	}

	class: string [] = ['ml-1', 'mr-1'];
}

export class Table {
	columns: TableColumn [] = [];
	rows: TableRow [] = [];


}
