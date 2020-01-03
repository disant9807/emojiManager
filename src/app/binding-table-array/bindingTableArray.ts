import {Table} from "../table/table";

export interface IBindingTableArray {
	arrayBind : any[];
	table: Table;
	
	generateTable();

	addRowsTable(_object: any);

	dellRowsTable(_object: any);

	findTableArrayEl(_object: any);

}
