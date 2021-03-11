import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ckeditor4Component } from './ckeditor4.component';

describe('Ckeditor4Component', () => {
  let component: Ckeditor4Component;
  let fixture: ComponentFixture<Ckeditor4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ckeditor4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ckeditor4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
