import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Button} from '../basic/elements/button/button';
import {style} from '../basic/elements/style';
import {AppService} from './services/app.service';
import {Emoji} from '../basic/elements/emoji';
import {ITableCell} from './table/table';
import {BindTableEmojiAll, BindTableEmojiDel, BindTableEmojiStar} from './bindingTableEmoji';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'emoj';

	@ViewChild('input', {static: false}) inputFind: ElementRef;

	EmojiAll: Emoji[] = [];
	EmojiAllBindTable: BindTableEmojiAll = new BindTableEmojiAll(this.EmojiAll);

	EmojiStar: Emoji[] = [];
	EmojiStarBindTable: BindTableEmojiStar = new BindTableEmojiStar(this.EmojiStar);

	EmojiDel: Emoji[] = [];
	EmojiDelBindTable: BindTableEmojiDel = new BindTableEmojiDel(this.EmojiDel);

	srcFullImg: string = '';
	fullImgVisible: boolean = false;

	// наведение мыши на иконку
	mouseOverCellImg(cell: ITableCell) {
		if (cell.actionName === 'fullImg') {
			this.srcFullImg = cell.content;
			this.fullImgVisible = true;
		}
	}

	// покидание мыши иконки
	mouseLeaveCellImg(cell: ITableCell) {
		if (cell.actionName === 'fullImg') {
			this.srcFullImg = cell.content;
			this.fullImgVisible = false;
		}
	}

	// обработка кликов таблицы всех иконок
	clickTableEmojiAll(cell: ITableCell) {
		if (cell.actionName === 'star') {
			this.addEmojiStarFromAll(cell);
		} else if (cell.actionName === 'del') {
			this.addEmojiDelFromAll(cell);
		}
	}

	// обработка кликов таблицы избранных иконок
	clickTableEmojiStar(cell: ITableCell) {
		if (cell.actionName === 'return') {
			this.dellEmojiStar(cell);
		}
	}

	// обработка кликов таблицы удаленных иконок
	clickTableEmojiDel(cell: ITableCell) {
		if (cell.actionName === 'return') {
			this.dellEmojiDell(cell);
		}
	}

	// фильтрация списков
	clickInputFind() {
		let text = this.inputFind.nativeElement.value;
		if (text.length > 0) {
			if (this.activeLeftMenuButton.name === 'Все') {
				this.EmojiAllBindTable.filterTable(text);
			} else if (this.activeLeftMenuButton.name === 'Любимые') {
				this.EmojiStarBindTable.filterTable(text);
			} else if (this.activeLeftMenuButton.name === 'Удаленные') {
				this.EmojiDelBindTable.filterTable(text);
			}
		} else {
			if (this.activeLeftMenuButton.name === 'Все') {
				this.EmojiAllBindTable.endFilter();
			} else if (this.activeLeftMenuButton.name === 'Любимые') {
				this.EmojiStarBindTable.endFilter();
			} else if (this.activeLeftMenuButton.name === 'Удаленные') {
				this.EmojiDelBindTable.endFilter();
			}
		}
	}

	// сброс фильтрации
	clickInputEndFind() {
		this.inputFind.nativeElement.value = '';
		if (this.activeLeftMenuButton.name === 'Все') {
			this.EmojiAllBindTable.endFilter();
		} else if (this.activeLeftMenuButton.name === 'Любимые') {
			this.EmojiStarBindTable.endFilter();
		} else if (this.activeLeftMenuButton.name === 'Удаленные') {
			this.EmojiDelBindTable.endFilter();
		}
	}

	// добавление иконки в список избранных
	addEmojiStarFromAll(cell: ITableCell) {
		let el: Emoji = this.EmojiAllBindTable.findTableArrayEl(cell); // получаем объект Emoji исходя из кликнутой в таблице ячейки
		this.EmojiAllBindTable.lineSelectionTableEmoji(true, cell); // окрышиваем кликнутую строку
		this.EmojiStarBindTable.addRowsTable(el); // добавляем полученный Emoji в таблицу избранное
	}

	// добавление иконки в список удаленных
	addEmojiDelFromAll(cell: ITableCell) {
		let el: Emoji = this.EmojiAllBindTable.findTableArrayEl(cell); // получаем объект Emoji исходя из кликнутой в таблице ячейки
		this.EmojiDelBindTable.addRowsTable(el); // добавляем полученный Emoji в таблицу Удаленного
		this.EmojiAllBindTable.dellRowsTable(cell); // удаляем кликнутую ячейку из основной таблицы
		this.EmojiStarBindTable.dellRowsTable(cell); // удаляем кликнутую ячейку из таблицы избранного
	}

	// удаление иконки из списка избранных
	dellEmojiStar(cell: ITableCell) {
		let emoji = this.EmojiStarBindTable.findTableArrayEl(cell); // получаем объект Emoji исходя из кликнутой в таблице ячейки
		this.EmojiAllBindTable.lineSelectionTableEmoji(false, emoji); // убираем окрашивание кликнутой строки
		this.EmojiStarBindTable.dellRowsTable(cell); // удаляем кликнутую строку из таблицы избранного
	}

	// удаление иконки из списка удаленных
	dellEmojiDell(cell: ITableCell) {
		let emoji = this.EmojiDelBindTable.findTableArrayEl(cell); // получаем объект Emoji исходя из кликнутой в таблице ячейки
		this.EmojiAllBindTable.addRowsTable(emoji); // добавляем полученный Emoji в таблицу все
		this.EmojiDelBindTable.dellRowsTable(cell); // удаляем кликнутую ячейку из таблицы удаленного
	}

	//---- left-menu.component -----
	buttonsLeftMenu: Button [] = [new Button('Все', style.size.default, style.color.secondary),
		new Button('Любимые', style.size.default, style.color.secondary),
		new Button('Удаленные', style.size.default, style.color.secondary)];
	activeLeftMenu: style.color = style.color.primary;
	private activeLeftMenuButton: Button = this.buttonsLeftMenu[0];

	setActiveButton(butt: Button) {
		this.activeLeftMenuButton = butt;
	}

	//---- end ----

	constructor(private appservice: AppService) {
	}

	ngOnInit() {

		this.appservice.getData().subscribe(data => {
			Object.entries(data).forEach(([key, value]) => {
				this.EmojiAll.push(new Emoji(key, value));
			});
			this.EmojiAllBindTable.generateTable();
		});

		this.EmojiStarBindTable.generateTable(); // Генерируем таблицу для избранных иконок
		this.EmojiDelBindTable.generateTable(); // Генерируем таблицу для удаленных иконок

	}
}
