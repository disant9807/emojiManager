import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgUnderComponent } from './img-under.component';

describe('ImgUnderComponent', () => {
  let component: ImgUnderComponent;
  let fixture: ComponentFixture<ImgUnderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgUnderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgUnderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
