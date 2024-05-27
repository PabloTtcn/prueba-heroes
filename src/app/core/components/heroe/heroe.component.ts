import { Component, Input, OnInit ,output} from '@angular/core';
import { Heroe } from '../../interfaces/heroe';
import { PrimeraMayusPipe } from '../../../shared/pipes/primeraMayus.pipe';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NgIf, NgStyle } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import { Flag } from '../../interfaces/flag';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogBorradoComponent } from '../../../shared/dialog-borrado/dialog-borrado.component';
import { HeroesService } from '../../services/heroes.service';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { DialogFalloComponent } from '../../../shared/dialog-fallo/dialog-fallo.component';


//transiciones del fade out
const fadeInOut = trigger('fadeInOut', [
  state(
    'in',
    style({
      opacity: 1,
      height: '*',
    })
  ),
  transition('void => *', [style({ opacity: 0 , height: '0px'}), animate('1s ease-out')]),
  transition('* => void', [animate('1s ease-out'), style({ opacity: 0 , height: '0px',})]),
]);
@Component({
  selector: 'app-heroe',
  standalone: true,
  imports: [
    PrimeraMayusPipe,
    MatButtonModule,
    MatCardModule,
    NgStyle,NgIf,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    RouterModule 
    ],
  templateUrl: './heroe.component.html',
  styleUrl: './heroe.component.scss',
  animations:[fadeInOut]
})


export class HeroeComponent implements OnInit {
  onSeleccionadoChange = output<Flag>(); 
  flag : Flag = {id:0,flag:true}
  @Input() heroe?: Heroe;
  seleccionado: boolean = false;
  urlIcono : String = ""
  //iobservable para simular llamadas y spinner
  observable = new Observable(this.myObservable);
  myObservable(observer: { next: (arg0: string) => void; complete: () => void; }) {
    setTimeout(() => {
      observer.next("done waiting for 2 sec");
      observer.complete();
    }, 2000);
  }
  constructor(public dialog: MatDialog,private heroesService: HeroesService,private router: Router) {}
  
  
  ngOnInit(): void {
    //con este concat podemos pasarle la url al icono en un ngStyle
    this.urlIcono = "url('assets/icons/iconos-tarjeta/" + this.heroe?.idIcono +".JPG')"
    this.flag.id = this.heroe?.id ? this.heroe?.id : 0
    this.seleccionado = this.heroe?.selected ? this.heroe?.selected : false
  }
  seleccionar(){
      this.seleccionado = !this.seleccionado
      this.flag.flag = this.seleccionado
      this.onSeleccionadoChange.emit(this.flag);
  }
  eliminarHeroe(observable: any): void {
    const dialogRef = this.dialog.open(DialogBorradoComponent, {
      data: this.heroe,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let dialogRef: MatDialogRef<SpinnerComponent> = this.dialog.open(SpinnerComponent, {
          panelClass: 'transparent',
          disableClose: true
        });
        let subscription = observable.subscribe(
          (response: any) => {
            subscription.unsubscribe();
            this.heroesService.deleteHeroMock(this.heroe?.id ? this.heroe?.id : 0).subscribe({
              next: heroe => console.log("heroe eliminado",heroe),
              error: () => { const dialogRef = this.dialog.open(DialogFalloComponent, {})},
              complete: () => console.log('Heroes eliminar complete')
            });  
            dialogRef.close();
          },
          () => {
            subscription.unsubscribe();
            //handle error
            dialogRef.close();
          }
        );
    }
    });
  }

}
