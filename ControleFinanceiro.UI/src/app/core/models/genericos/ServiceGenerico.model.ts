import { MatSnackBar } from "@angular/material/snack-bar";

export abstract class Mensageria {
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
