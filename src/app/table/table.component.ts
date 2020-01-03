import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Table, ITableCell} from "./table";
import {style} from "../../basic/elements/style";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
	@Input() table : Table;
	@Output() Action = new EventEmitter<ITableCell>();
	@Output() MouseOverAct = new EventEmitter<ITableCell>();
	@Output() MouseLeaveAct = new EventEmitter<ITableCell>();

	click(actionName :ITableCell,  array: number []) {
		actionName.indexTable = array;
		this.Action.emit(actionName);
	}

	mouseOver(actionName :ITableCell,  array: number []) {
		actionName.indexTable = array;
		this.MouseOverAct.emit(actionName);
	}

	mouseLeave (actionName :ITableCell,  array: number []) {
		actionName.indexTable = array;
		this.MouseLeaveAct.emit(actionName);
	}

	private styleElem = style.element;
  constructor() { }

  ngOnInit() {

  }

}
