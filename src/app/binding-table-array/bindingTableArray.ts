import {Table} from '../table/table';

export interface IBindingTableArray {
	arrayBind: any[];
	table: Table;

	generateTable();

	addRowsTable(object: any);

	dellRowsTable(object: any);

	findTableArrayEl(object: any);

}
