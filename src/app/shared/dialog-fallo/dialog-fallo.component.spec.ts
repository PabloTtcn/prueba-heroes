import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFalloComponent } from './dialog-fallo.component';

describe('DialogFalloComponent', () => {
  let component: DialogFalloComponent;
  let fixture: ComponentFixture<DialogFalloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFalloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogFalloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
