import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductImageDialogComponent } from './SelectProductImageDialogComponent';

describe('SelectProductImageDialogComponent', () => {
  let component: SelectProductImageDialogComponent;
  let fixture: ComponentFixture<SelectProductImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectProductImageDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectProductImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
