import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XsltEditorComponent } from './xslt-editor.component';

describe('XsltEditorComponent', () => {
  let component: XsltEditorComponent;
  let fixture: ComponentFixture<XsltEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XsltEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XsltEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
