import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensageriaService {

  constructor(private snackBar: MatSnackBar) { }

  /* Modal */
  openSnackBar(message: string) {
    return this.snackBar.open(message, undefined, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
