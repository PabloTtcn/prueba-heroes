import { Component, OnInit } from '@angular/core';
import { FiltroComponent } from '../filtro/filtro.component';
import { ListadoHeroeComponent } from '../listado-heroe/listado-heroe.component';
import { Heroe } from '../../interfaces/heroe';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { Observable } from 'rxjs';
import { DialogFalloComponent } from '../../../shared/dialog-fallo/dialog-fallo.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FiltroComponent,
    ListadoHeroeComponent,
    NgIf,MatCardModule,
    MatButtonModule,
    RouterOutlet, 
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private heroesService: HeroesService,private dialog: MatDialog) {}
  // variables para manejar el filtro sin tener que llamar varias veces
  heroesInicial:Heroe[] = []
  heroesInput:Heroe[] = []
  // con este observable encapsulamos las llamadas para sacar el spinner y simular una llamada
  observable = new Observable(this.myObservable);
  myObservable(observer: { next: (arg0: string) => void; complete: () => void; }) {
    setTimeout(() => {
      observer.next("done waiting for 2 sec");
      observer.complete();
    }, 2000);
  }
  ngOnInit(): void {
    this.getHeroes(this.observable)
  }
  getHeroes(observable: any): void {
    let dialogRef: MatDialogRef<SpinnerComponent> = this.dialog.open(SpinnerComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    let subscription = observable.subscribe(
      (response: any) => {
        subscription.unsubscribe();
        //handle response
        this.heroesService.getHeroesMock().subscribe({
          next: heroes =>{ 
          console.log("heroes get",heroes)
          this.heroesInicial = heroes
          this.heroesInput = this.heroesInicial
          },
          error: () => { const dialogRef = this.dialog.open(DialogFalloComponent, {})},
          complete: () => console.log('Heroes Get complete')
        }
      );

        dialogRef.close();
      },
      () => {
        subscription.unsubscribe();
        //handle error
        dialogRef.close();
      }
    );
  }
  
  onFiltro(filtro:string)
  {
    //con esto filtramos sin llamar 
    this.heroesInput = this.heroesInput.filter(heroes => heroes.nombre.includes(filtro));
  }
  onReinicio(flag:boolean){
    //con esto reiniciamos sin llamar
    if(flag){
      this.heroesInput = this.heroesInicial
    }
  }
}
