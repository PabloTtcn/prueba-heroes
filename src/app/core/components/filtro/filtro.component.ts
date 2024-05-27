import { Component, OnInit, output } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { NgIf } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
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
  selector: 'app-filtro',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule ,MatButtonModule, MatDividerModule, MatIconModule,NgIf],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
  animations:[fadeInOut]
})
export class FiltroComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) {
  }
  observable = new Observable(this.myObservable);
  onFiltro = output<string>(); 
  onReinicio = output<boolean>(); 
  filterFormGroup!:FormGroup
  disabledBotonLimpiar : boolean = false
  filtroFormControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    this.filterFormGroup=new FormGroup({
      'filtroFormControl':new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')])
    })
  }
  //con este observable simulamos las llamadas y sacamos el spinner
  myObservable(observer: { next: (arg0: string) => void; complete: () => void; }) {
    setTimeout(() => {
      observer.next("done waiting for 2 sec");
      observer.complete();
    }, 2000);
  }

  onSubmit(observable: any) {
    if(this.filterFormGroup.valid){
      let dialogRef: MatDialogRef<SpinnerComponent> = this.dialog.open(SpinnerComponent, {
        panelClass: 'transparent',
        disableClose: true
      });
      let subscription = observable.subscribe(
        (response: any) => {
          subscription.unsubscribe();
          //sacamos el output del filtro al dashboard
            this.onFiltro.emit(this.filterFormGroup.get("filtroFormControl")?.value)
            this.disabledBotonLimpiar = true
            
          dialogRef.close();
        },
        () => {
          subscription.unsubscribe();
          //handle error
          dialogRef.close();
        }
      );
    }
  }
  reiniciarListado(observable: any) {
    let dialogRef: MatDialogRef<SpinnerComponent> = this.dialog.open(SpinnerComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    let subscription = observable.subscribe(
      (response: any) => {
        subscription.unsubscribe();
        //handle response
        this.filterFormGroup.get("filtroFormControl")?.setValue("")
        this.onReinicio.emit(true)
        this.disabledBotonLimpiar = false
        dialogRef.close();
      },
      () => {
        subscription.unsubscribe();
        //handle error
        dialogRef.close();
      }
    );
  }

}
