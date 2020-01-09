import {Component, Output, Input, EventEmitter} from '@angular/core';
import {IBindingTableArray} from './bindingTableArray';
import {ITableCell} from '../table/table';

@Component({
	selector: 'app-binding-table-array',
	templateUrl: './binding-table-array.component.html',
	styleUrls: ['./binding-table-array.component.scss']
})
export class BindingTableArrayComponent {
	@Input() bind: IBindingTableArray;
	@Output() Action = new EventEmitter<ITableCell>();
	@Output() MouseOver = new EventEmitter<ITableCell>();
	@Output() MouseLeave = new EventEmitter<ITableCell>();


	actionBind(action: ITableCell) {
		this.Action.emit(action);
	}

	mouseOver(action: ITableCell) {
		this.MouseOver.emit(action);
	}

	mouseLeave(action: ITableCell) {
		this.MouseLeave.emit(action);
	}

	constructor() {
	}
}
