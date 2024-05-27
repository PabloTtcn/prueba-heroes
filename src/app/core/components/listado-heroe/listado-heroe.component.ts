import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { HeroeComponent } from '../heroe/heroe.component';
import { NgFor, NgIf } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { Heroe } from '../../interfaces/heroe';
import { Flag } from '../../interfaces/flag';


@Component({
  selector: 'app-listado-heroe',
  standalone: true,
  imports: [HeroeComponent,NgFor,MatGridListModule,NgIf],
  templateUrl: './listado-heroe.component.html',
  styleUrl: './listado-heroe.component.scss'
})
export class ListadoHeroeComponent implements OnInit {
  

  @Input() heroesInput?: Heroe[];
  heroesLocal : Heroe[] = [];
  length : number = 0
  cols : number = 0
  rowHeight : string = "200px"
  rowSpan : number = 1
  ngOnInit(): void {
    this.length = this.heroesInput?.length ? this.heroesInput?.length : 0
    this.heroesLocal = this.heroesInput ? this.heroesInput : []
    //tramos de reactive 
    if (typeof window !== 'undefined') {
    if(window.innerWidth >= 1800){
      this.cols = 4
      }else if(window.innerWidth >= 1600) {
        this.cols = 3
      }else if(window.innerWidth >= 1100) {
        this.cols = 2
      }else if(window.innerWidth >= 800){
        this.cols = 1
      }else{
        this.cols = 1
      }
    }
  }
  onResize(event:any) {
    //tramos de reactive 
    if(event.target.innerWidth >= 1800){
      this.cols = 4
    }else if(event.target.innerWidth >= 1600) {
      this.cols = 3
    }else if(event.target.innerWidth >= 1100) {
      this.cols = 2
    }else{
      this.cols = 1
    }
  }
  ngOnChanges(changes: SimpleChanges) {
      this.heroesLocal = changes['heroesInput'].currentValue
  }
  handleSeleccionadoChange(seleccionado:Flag){
    let objIndex = this.heroesLocal.findIndex(obj => obj.id == seleccionado.id);
    this.heroesLocal[objIndex].selected = seleccionado.flag
  }
}
