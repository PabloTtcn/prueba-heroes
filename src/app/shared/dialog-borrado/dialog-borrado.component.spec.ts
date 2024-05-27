import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBorradoComponent } from './dialog-borrado.component';

describe('DialogBorradoComponent', () => {
  let component: DialogBorradoComponent;
  let fixture: ComponentFixture<DialogBorradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogBorradoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogBorradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
