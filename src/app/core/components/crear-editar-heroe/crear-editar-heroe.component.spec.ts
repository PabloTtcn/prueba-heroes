import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarHeroeComponent } from './crear-editar-heroe.component';

describe('CrearEditarHeroeComponent', () => {
  let component: CrearEditarHeroeComponent;
  let fixture: ComponentFixture<CrearEditarHeroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEditarHeroeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearEditarHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
