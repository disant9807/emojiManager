import {Component, OnInit, Input, ViewChild, ElementRef, Renderer2} from '@angular/core';

@Component({
	selector: 'app-img-under',
	templateUrl: './img-under.component.html',
	styleUrls: ['./img-under.component.scss']
})
export class ImgUnderComponent implements OnInit {
	@Input() src: string;
	@ViewChild('imgFull', {static: false}) imgElem: ElementRef;

	constructor(private renderer: Renderer2) {
	}

	ngOnInit() {
		document.addEventListener('mousemove', (event) => {
			let x = event.clientX;
			let y = event.clientY;

			this.renderer.setStyle(this.imgElem.nativeElement, 'left', `${x}px`);
			this.renderer.setStyle(this.imgElem.nativeElement, 'top', `${y}px`);
		});
	}

}
