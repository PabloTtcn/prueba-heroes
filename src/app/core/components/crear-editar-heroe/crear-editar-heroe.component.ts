import { Component, OnInit } from '@angular/core';
import {Validators, FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import { ErrorStateMatcher, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RutaIcono } from '../../interfaces/rutaIcono';
import { Heroe } from '../../interfaces/heroe';
import { DatePipe } from '@angular/common'
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogFalloComponent } from '../../../shared/dialog-fallo/dialog-fallo.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-crear-editar-heroe',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    NgFor,
    NgStyle,
    MatCardModule,
    NgIf
  ],
  providers: [
    DatePipe,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' } // Configura el idioma a español
  ],
  templateUrl: './crear-editar-heroe.component.html',
  styleUrl: './crear-editar-heroe.component.scss'
})

export class CrearEditarHeroeComponent implements OnInit {
  
  constructor(private heroesService: HeroesService,public datepipe: DatePipe, private router: Router,private route: ActivatedRoute,public dialog: MatDialog){}
    // Función de filtro para el datepicker
    dateFilter = (date: Date | null): boolean => {
      const today = (new Date());
      // Devuelve true si la fecha es menor o igual a la fecha actual
      if (!date) {
        return true;
      }
      return date <= today;
    }
  nuevoHeroe : Heroe = {
    id:0,
    nombre:"",
    identidadSecreta:"",
    villano:false,
    fechaNacimiento:"",
    selected:false,
    idIcono:1
  }
  idModo: number | null = null;
  modoCrear: boolean = true;
  matcher = new MyErrorStateMatcher();
  nombreControl = new FormControl('', [Validators.required]);
  radioButtonControl = new FormControl('false', [Validators.required]);
  identidadControl = new FormControl('', []);
  fechaControl = new FormControl('', []);
  idSeleccion : number = 0
  firstFormGroup!:FormGroup
  secondFormGroup!:FormGroup
  thirdFormGroup!:FormGroup
  //rutas icono al viejo estilo
  rutasIconoLocal :RutaIcono[] = [
    {id:1,ruta:"assets/icons/iconos-tarjeta/1.JPG",seleccionado:true},
    {id:2,ruta:"assets/icons/iconos-tarjeta/2.JPG",seleccionado:false},
    {id:3,ruta:"assets/icons/iconos-tarjeta/3.JPG",seleccionado:false},
    {id:4,ruta:"assets/icons/iconos-tarjeta/4.JPG",seleccionado:false},
    {id:5,ruta:"assets/icons/iconos-tarjeta/5.JPG",seleccionado:false},
    {id:6,ruta:"assets/icons/iconos-tarjeta/6.JPG",seleccionado:false},
    {id:7,ruta:"assets/icons/iconos-tarjeta/7.JPG",seleccionado:false},
    {id:8,ruta:"assets/icons/iconos-tarjeta/8.JPG",seleccionado:false},
    {id:9,ruta:"assets/icons/iconos-tarjeta/9.JPG",seleccionado:false}
  ]
  ngOnInit(): void {
    //sacamos el id de la ruta
    this.route.paramMap.subscribe(params => {
        const idParam = params.get('id')
        this.idModo = idParam !== null ? +idParam : null;
      });
    //segun el modo estaremos editando o creando
    if(this.idModo != null && this.idModo > 0){ 
      this.modoCrear = false
      this.heroesService.getHeroeIdMock(this.idModo).subscribe({
        next: heroe => {
          this.firstFormGroup =new FormGroup({
            'nombreControl':new FormControl(heroe.nombre, [Validators.required]),
            'radioButtonControl':new FormControl(heroe.villano.toString(),[Validators.required])
          })
          if(heroe.fechaNacimiento !== undefined){
            this.secondFormGroup =new FormGroup({
              'identidadControl':new FormControl(heroe.identidadSecreta, []),
              'fechaControl':new FormControl(this.stringToDate(heroe.fechaNacimiento), []),
            })
          }
          this.thirdFormGroup =new FormGroup({
          })
          this.rutasIconoLocal[0].seleccionado = false;
          this.rutasIconoLocal[heroe.idIcono - 1].seleccionado = true;
        },
        error: () => { const dialogRef = this.dialog.open(DialogFalloComponent, {})},
        complete: () => console.log('get heroe complete')
      });
    }else{
      this.modoCrear = true
      this.firstFormGroup =new FormGroup({
        'nombreControl':new FormControl('', [Validators.required]),
        'radioButtonControl':new FormControl('false',[Validators.required])
      })
      this.secondFormGroup =new FormGroup({
        'identidadControl':new FormControl('', []),
        'fechaControl':new FormControl('', []),
      })
      this.thirdFormGroup =new FormGroup({
      })
    }
  }
  seleccion(id: number){
    //con esto se resalta el icono seleccionado
    for(let i = 0 ; i < this.rutasIconoLocal.length; i++ ){
      this.rutasIconoLocal[i].seleccionado = false
    }
    this.rutasIconoLocal[id - 1].seleccionado = !this.rutasIconoLocal[id - 1].seleccionado
    this.idSeleccion = id
  }
  crear(){
    //formamos el nuevo heroe para llamar al servico crear
    this.nuevoHeroe.nombre = this.firstFormGroup.get("nombreControl")?.value
    this.nuevoHeroe.identidadSecreta = this.secondFormGroup.get("identidadControl")?.value
    if(this.firstFormGroup.get("radioButtonControl")?.value == "true"){
      this.nuevoHeroe.villano = true
    }else{
      this.nuevoHeroe.villano = false
    }
    let latest_date = this.datepipe.transform(this.secondFormGroup.get("fechaControl")?.value, 'dd/MM/yyyy')
    if (latest_date !== null) {
      this.nuevoHeroe.fechaNacimiento = latest_date
    }
    this.nuevoHeroe.selected = false
    this.nuevoHeroe.idIcono = this.idSeleccion
    this.crearHeroe(this.nuevoHeroe)
    this.router.navigate(['/dashboard']);
    
  }
  editar(){
    //buscamos el heroe a editar
    if(this.idModo != null){
      this.nuevoHeroe.id =  this.idModo 
    }
    this.nuevoHeroe.nombre = this.firstFormGroup.get("nombreControl")?.value
    this.nuevoHeroe.identidadSecreta = this.secondFormGroup.get("identidadControl")?.value
    if(this.firstFormGroup.get("radioButtonControl")?.value == "true"){
      this.nuevoHeroe.villano = true
    }else{
      this.nuevoHeroe.villano = false
    }
    let latest_date = this.datepipe.transform(this.secondFormGroup.get("fechaControl")?.value, 'dd/MM/yyyy')
    if (latest_date !== null) {
      this.nuevoHeroe.fechaNacimiento = latest_date
    }
    this.nuevoHeroe.selected = false
    this.nuevoHeroe.idIcono = this.idSeleccion
    this.editarHeroe(this.nuevoHeroe)
    this.router.navigate(['/dashboard']);
    
  }
  crearHeroe(nuevoHeroe:Heroe): void {
    this.heroesService.addHeroMock(nuevoHeroe).subscribe({
      next: heroe => console.log("heroe creado",heroe),
      error: () => { const dialogRef = this.dialog.open(DialogFalloComponent, {})},
      complete: () => console.log('Heroes crear complete')
    });
  }
  editarHeroe(nuevoHeroe:Heroe): void {
    this.heroesService.editHeroMock(nuevoHeroe).subscribe({
      next: heroe => console.log("heroe editado",heroe),
      error: () => { const dialogRef = this.dialog.open(DialogFalloComponent, {})},
      complete: () => console.log('Heroes editar complete')
    });
  }

  stringToDate(dateString: string): Date {
    // Divide la cadena de texto en partes: día, mes y año
    const [day, month, year] = dateString.split('/').map(part => parseInt(part, 10));
  
    // Crea una nueva fecha usando las partes, recuerda que los meses empiezan en 0 (enero es 0, diciembre es 11)
    return new Date(year, month - 1, day);
  }

}
