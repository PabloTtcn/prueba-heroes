import { Injectable } from '@angular/core';
import { Heroe } from '../interfaces/heroe';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private heroesUrl = 'api/heroes';  // URL to web api
  heroesMock: Heroe[] = [
    { id: 12, nombre: 'dr. Nice', identidadSecreta: "Pepe Pepote", villano: false, fechaNacimiento: "08/11/1993", selected: false ,idIcono: 1 },
    { id: 13, nombre: 'bombasto', identidadSecreta: "Pepe Pepote",villano: false, fechaNacimiento: "08/11/1993", selected: false ,idIcono: 2 },
    { id: 14, nombre: 'celeritas', identidadSecreta: "Pepe Pepote", villano: true, fechaNacimiento: "08/11/1993", selected: false ,idIcono: 3 },
    { id: 15, nombre: 'magneta',  identidadSecreta: "Pepe Pepote",villano :false, fechaNacimiento: "08/11/1993", selected: false ,idIcono: 4 },
    { id: 16, nombre: 'rubberMan',  identidadSecreta: "Pepe Pepote",villano: false, fechaNacimiento: "08/11/1993", selected: false ,idIcono: 5 },
    { id: 17, nombre: 'dynama',  identidadSecreta: "Pepe Pepote",villano: true, fechaNacimiento: "08/11/1993", selected: false ,idIcono: 6 },
    { id: 18, nombre: 'dr. IQ',  identidadSecreta: "Pepe Pepote",villano: false, fechaNacimiento: "08/11/1993", selected: false ,idIcono: 7 },
    { id: 19, nombre: 'magma',  identidadSecreta: "Pepe Pepote",villano: false,  fechaNacimiento: "08/11/1993",selected: false ,idIcono: 8 },
    { id: 20, nombre: 'tornado',  identidadSecreta: "Pepe Pepote",villano: true,  fechaNacimiento: "08/11/1993",selected: false ,idIcono: 9 }
  ];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getHeroesMock():Observable<Heroe[]>{
    return of(this.heroesMock);
  }
  getHeroeIdMock(id:number):Observable<Heroe>{
    let objIndex = this.heroesMock.findIndex(obj => obj.id == id);
    return of(this.heroesMock[objIndex]);
  }
  addHeroMock(nuevoHeroe :Heroe):Observable<Heroe> {
    nuevoHeroe.id = this.genId(this.heroesMock)
    this.heroesMock.push(nuevoHeroe)
    return of(nuevoHeroe);
  }
  editHeroMock(nuevoHeroe :Heroe):Observable<Heroe> {
    let indexToReplace = this.heroesMock.findIndex(obj => obj.id == nuevoHeroe.id);
    this.heroesMock[indexToReplace] = nuevoHeroe
    return of(nuevoHeroe);
  }
  deleteHeroMock(id:number){
    let objIndex = this.heroesMock.findIndex(obj => obj.id == id);
    const heroeEliminado = this.heroesMock.splice(objIndex, 1);
    return of(heroeEliminado);
  }
  genId(heroes: Heroe[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
