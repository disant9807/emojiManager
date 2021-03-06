import {IBindingTableArray} from './binding-table-array/bindingTableArray';
import {
	Table,
	TableRow,
	TableIconCell,
	TableButtonCell,
	TableCellCells,
	TableColumn,
	TableCell,
	ITableCell
} from './table/table';
import {Emoji} from '../basic/elements/emoji';


abstract class BindTableEmoji {
	table: Table;
	arrayBind: Emoji[];
	tableFiltered: Table;

	constructor(arrayBind: Emoji[]) {
		this.arrayBind = arrayBind;
		this.table = new Table();
		this.tableFiltered = new Table();
	}


	findTableArrayEl(cell: ITableCell) { // поиск строки с определенной ячейкой в таблице
		let findName = this.table.rows[cell.indexTable[0]].cells[0].content;

		return this.arrayBind.find(item => {
			return item.name === findName;
		});
	}

	findRowFromEmoji(emoji: Emoji) { // поиск строки таблицы, которая соответствует элементу массива emoji
		return this.table.rows.find(item => {
			return item.cells[0].content === emoji.name;
		});
	}

	// Выделение иконки (стилистически, светлый зеленый цвет)
	lineSelectionTableEmoji(selected: boolean, emoji: Emoji): void;
	lineSelectionTableEmoji(selected: boolean, cell: ITableCell): void;
	lineSelectionTableEmoji(selected: boolean, row: TableRow): void;
	lineSelectionTableEmoji(selected: boolean, row: any) {
		if (row.name) {
			let findRow = this.findRowFromEmoji(row);
			findRow.class = selected ? ['table-success'] : [];
		} else if (!row.indexTable) {
			row.class = selected ? ['table-success'] : [];
		} else if (row.indexTable) {
			let findRow = this.table.rows[row.indexTable[0]];
			findRow.class = selected ? ['table-success'] : [];
		}
	}

	// Удаление строки таблицы
	dellRowsTable(cell: ITableCell) {
		let indexDel;

		let findName = this.table.rows[cell.indexTable[0]].cells[0].content;
		let find = this.arrayBind.find((item, index) => {
			indexDel = index;
			return item.name === findName;
		});
		if (find) {
			this.table.rows.splice(cell.indexTable[0], 1);
			this.arrayBind.splice(indexDel, 1);
		}
	}

	sortArrayBind() { // Сортировка массива, привязанного к таблице
		this.arrayBind.sort((item1, item2) => {
			let txt1 = item1.name.toLowerCase();
			let txt2 = item2.name.toLowerCase();
			if (txt1 < txt2) {
				return -1;
			} else if (txt1 > txt2) {
				return 1;
			} else {
				return 0;
			}
		});
	}

	sortTable() {
		this.table.rows = this.table.rows.sort((a, b) => {

			let content1 = a.cells[0].content.toLowerCase();
			let content2 = b.cells[0].content.toLowerCase();

			if (content1 < content2) {
				return -1;
			} else if (content1 > content2) {
				return 1;
			}
			return 0;
		});
	}
}

// класс отвечающий за связывания массива всех иконок с таблицей
export class BindTableEmojiAll extends BindTableEmoji implements IBindingTableArray {

	constructor(arrEmoji: Emoji[]) {
		super(arrEmoji);
	}

	private checkLocalStorage() { // удаляем из таблицы и массива иконки, находящиеся в массиве удаленных (считывается из локалсторедж)
		let emojilocal = JSON.parse(localStorage.getItem('del'));
		if (emojilocal) {
			emojilocal.forEach(item => {
				let findIndex;
				let find = this.arrayBind.find((itemFind, index) => {
					findIndex = index;
					return itemFind.name === item.name;
				});
				if (find) {
					this.arrayBind.splice(findIndex, 1);
				}
			});
		}
	}

	generateTable() { // метод отвечающий за генерацию таблицы из массива иконок
		this.checkLocalStorage();

		let emojilocal = JSON.parse(localStorage.getItem('star')); // парсим из локалсторедж избранные иконки

		let columns: TableColumn [] = [new TableColumn('Название'), new TableColumn('Путь'), new TableColumn('Первью'), new TableColumn('Действия')];
		let rows: TableRow [] = [];

		this.arrayBind.forEach(item => { // цилк по массиву иконок
			let cell1 = new TableCell(item.name);
			let cell2 = new TableCell(item.src);
			let cell3 = new TableIconCell(item.src);
			cell3.actionName = 'fullImg';

			let cellCellIcon = new TableIconCell('../../assets/icon/star.png');
			cellCellIcon.actionName = 'star';
			cellCellIcon.class = ['tableEmoj__action'];

			let cellCellIcon2 = new TableIconCell('../../assets/icon/close.png');
			cellCellIcon2.actionName = 'del';
			cellCellIcon2.class = ['tableEmoj__action'];

			let cell4 = new TableCellCells([ // сложная ячейка, которая в себе содержит 2 обычные ячейки
				cellCellIcon,
				cellCellIcon2
			]);
			let cellArr = [cell1, cell2, cell3, cell4];
			let row = new TableRow(cellArr);

			if (emojilocal) { // Если текущая иконка содержится еще в избранных иконках из локалсторедж, то мы ее выделяем
				if (emojilocal.find(itemFind => {
					return itemFind.name === item.name;
				})) {
					this.lineSelectionTableEmoji(true, row);
				}
			}

			rows.push(row); // добавляес ячейки в строку
		});
		this.table.columns = columns;
		this.table.rows = rows;
		this.sortTable(); // сортируем таблицу
	}

	addRowsTable(_emoji: Emoji) { // добавление новой иконки (она добавитья в массив иконок, и соответственно появится в таблице)
		const findEmoji = this.arrayBind.find(item => {
			return item.name === _emoji.name;
		});

		if (findEmoji === undefined) {
			this.arrayBind.push(_emoji);
			let cell1 = new TableCell(_emoji.name);
			let cell2 = new TableCell(_emoji.src);
			let cell3 = new TableIconCell(_emoji.src);
			cell3.actionName = 'fullImg';

			let cellCellIcon = new TableIconCell('../../assets/icon/star.png');
			cellCellIcon.actionName = 'star';

			let cellCellIcon2 = new TableIconCell('../../assets/icon/close.png');
			cellCellIcon2.actionName = 'del';

			let cell4 = new TableCellCells([
				cellCellIcon,
				cellCellIcon2
			]);
			let cellArr = [cell1, cell2, cell3, cell4];
			let row = new TableRow(cellArr);
			this.table.rows.push(row);

			this.sortTable();
		}
	}

	filterTable(nameEmoji: string) { // фильтрация таблицы
		this.generateTable();
		this.table.rows = this.table.rows.filter(item => {
			return item.cells[0].content.toLowerCase().includes(nameEmoji.toLowerCase());
		});
	}

	endFilter() { // сброс фильтрации
		this.generateTable();
	}
}

// класс отвечающий за связывание массива удаленных иконок с таблицей
export class BindTableEmojiDel extends BindTableEmoji implements IBindingTableArray {

	constructor(arrEmoji: Emoji[]) {
		super(arrEmoji);
	}

	private checkLocalStorage() { // считываем из локалсторедж удаленные иконки и добавляем их в массив, если их там нет
		let emojilocal = JSON.parse(localStorage.getItem('del'));

		if (emojilocal) {
			emojilocal.forEach(item => {
				let find = this.arrayBind.find(itemFind => {
					return itemFind.name === item.name;
				});

				if (find === undefined) {
					this.arrayBind.push(item);
				}
			});
		}
	}

	generateTable() { // генерация таблицы из массива удаленных иконок
		this.checkLocalStorage();

		let columns: TableColumn [] = [new TableColumn('Название'), new TableColumn('Путь'), new TableColumn('Первью'), new TableColumn('Действия')];
		let rows: TableRow [] = [];

		this.arrayBind.forEach(item => {
			let cell1 = new TableCell(item.name);
			let cell2 = new TableCell(item.src);
			let cell3 = new TableIconCell(item.src);
			cell3.actionName = 'fullImg';
			let cell4 = new TableButtonCell('Восстановить');
			cell4.actionName = 'return';
			let cellArr = [cell1, cell2, cell3, cell4];
			let row = new TableRow(cellArr);
			rows.push(row);
		});

		this.table.columns = columns;
		this.table.rows = rows;
		this.sortTable();
	}

	addRowsTable(_emoji: Emoji) { // добавление новой иконки (она добавитья в массив иконок, и соответственно появится в таблице)
		this.arrayBind.push(_emoji);
		let cell1 = new TableCell(_emoji.name);
		let cell2 = new TableCell(_emoji.src);
		let cell3 = new TableIconCell(_emoji.src);
		cell3.actionName = 'fullImg';

		let cell4 = new TableButtonCell('Восстановить');
		cell4.actionName = 'return';
		let cellArr = [cell1, cell2, cell3, cell4];
		let row = new TableRow(cellArr);
		this.table.rows.push(row);
		this.sortTable();

		localStorage.setItem('del', JSON.stringify(this.arrayBind));
	}

	dellRowsTable(cell: ITableCell) { // Удаление иконки
		super.dellRowsTable(cell);
		localStorage.setItem('del', JSON.stringify(this.arrayBind)); // не забываем изменить локалсторедж
	}

	filterTable(nameEmoji: string) { // фильтрация таблицы
		this.generateTable();
		this.table.rows = this.table.rows.filter(item => {
			return item.cells[0].content.toLowerCase().includes(nameEmoji.toLowerCase());
		});
	}

	endFilter() {
		this.generateTable();
	}

}

// класс отвечающий за связывание массива избранных иконок с таблицей
export class BindTableEmojiStar extends BindTableEmoji implements IBindingTableArray {

	constructor(arrEmoji: Emoji[]) {
		super(arrEmoji);
	}

	private checkLocalStorage() { // считываем из локалсторедж избранные иконки и добавляем их в массив, если их там нет
		let emojilocal = JSON.parse(localStorage.getItem('star'));

		if (emojilocal) {
			emojilocal.forEach(item => {
				let find = this.arrayBind.find(itemFind => {
					return itemFind.name === item.name;
				});

				if (find === undefined) {
					this.arrayBind.push(item);
				}
			});
		}
	}

	generateTable() { // генерация таблицы из массива избранных иконок
		this.checkLocalStorage();
		let columns: TableColumn [] = [new TableColumn('Название'), new TableColumn('Путь'), new TableColumn('Первью'), new TableColumn('Действия')];
		let rows: TableRow [] = [];

		this.arrayBind.forEach(item => {
			let cell1 = new TableCell(item.name);
			let cell2 = new TableCell(item.src);
			let cell3 = new TableIconCell(item.src);
			cell3.actionName = 'fullImg';
			let cell4 = new TableIconCell('../../assets/icon/close.png');
			cell4.actionName = 'return';
			cell4.class = ['tableEmoj__action'];
			let cellArr = [cell1, cell2, cell3, cell4];
			let row = new TableRow(cellArr);
			this.lineSelectionTableEmoji(true, row);
			rows.push(row);
		});

		this.table.columns = columns;
		this.table.rows = rows;
		this.sortTable();
	}

	addRowsTable(_emoji: Emoji) { // добавление новой иконки (она добавитья в массив иконок, и соответственно появится в таблице)
		this.arrayBind.push(_emoji);
		let cell1 = new TableCell(_emoji.name);
		let cell2 = new TableCell(_emoji.src);
		let cell3 = new TableIconCell(_emoji.src);
		cell3.actionName = 'fullImg';
		let cell4 = new TableIconCell('../../assets/icon/close.png');
		cell4.actionName = 'return';
		let cellArr = [cell1, cell2, cell3, cell4];
		let row = new TableRow(cellArr);
		this.lineSelectionTableEmoji(true, row);
		this.table.rows.push(row);
		this.sortTable();

		localStorage.setItem('star', JSON.stringify(this.arrayBind));
	}

	dellRowsTable(cell: ITableCell) { // Удаление иконки
		super.dellRowsTable(cell);
		localStorage.setItem('star', JSON.stringify(this.arrayBind));
	}

	filterTable(nameEmoji: string) { // Фильтрация иконки
		this.generateTable();
		this.table.rows = this.table.rows.filter(item => {
			return item.cells[0].content.toLowerCase().includes(nameEmoji.toLowerCase());
		});
	}

	endFilter() {
		this.generateTable();
	}

}
