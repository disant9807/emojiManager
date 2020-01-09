import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BindingTableArrayComponent} from './binding-table-array.component';

describe('BindingTableArrayComponent', () => {
	let component: BindingTableArrayComponent;
	let fixture: ComponentFixture<BindingTableArrayComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BindingTableArrayComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BindingTableArrayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
