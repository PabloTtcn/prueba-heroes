import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Heroe } from '../../core/interfaces/heroe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-borrado',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
  ],
  templateUrl: './dialog-borrado.component.html',
  styleUrl: './dialog-borrado.component.scss'
})
export class DialogBorradoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Heroe) { }

}
