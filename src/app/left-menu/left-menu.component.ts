import {Component, EventEmitter, Input, Output, AfterViewInit, ViewChildren, QueryList, ElementRef, Renderer2} from '@angular/core';
import {Button} from '../../basic/elements/button/button';
import {style} from '../../basic/elements/style';

@Component({
	selector: 'app-left-menu',
	templateUrl: './left-menu.component.html',
	styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements AfterViewInit {
	@Output() onChanged = new EventEmitter<Button>();
	@Input() buttons: Button [];
	@Input() activeColor: style.color;
	@Input() vertical: Boolean;

	@ViewChildren('buttons') htmlButtons: QueryList<ElementRef>;

	private active: number = 0;

	public setActive(index: number) {
		this.active = index;
		this.activeStyle();
	}

	private activeStyle() {
		this.htmlButtons.forEach((item, index) => {
			if (index !== this.active) {
				this.renderer.addClass(item.nativeElement, `btn-${this.buttons[index].color}`);
				this.renderer.removeClass(item.nativeElement, `btn-${this.activeColor}`);
			} else {
				this.renderer.addClass(item.nativeElement, `btn-${this.activeColor}`);
				this.renderer.removeClass(item.nativeElement, `btn-${this.buttons[index].color}`);
			}
		});
	}

	onClickButton(index: number) {
		this.setActive(index);
		this.onChanged.emit(this.buttons[index]);
	}

	constructor(private renderer: Renderer2) {
	}

	ngAfterViewInit() {
		this.onClickButton(0);
	}

}
