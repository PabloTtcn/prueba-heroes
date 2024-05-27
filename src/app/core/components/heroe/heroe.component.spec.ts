import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroeComponent } from './heroe.component';
import { PrimeraMayusPipe } from '../../../shared/pipes/primeraMayus.pipe';

describe('HeroeComponent', () => {
  let component: HeroeComponent;
  let fixture: ComponentFixture<HeroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroeComponent,PrimeraMayusPipe]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
