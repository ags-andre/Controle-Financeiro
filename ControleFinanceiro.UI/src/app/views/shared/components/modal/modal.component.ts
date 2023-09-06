import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CategoriasService } from 'src/app/core/services/gerenciamento/categorias.service';
import { Modal } from '../../../../core/models/classes/Modal.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  public inscricoes: Subscription[] = new Array();

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Modal
  ) {}

  ngOnInit(): void {}

  public returnValor(): void {
    this.dialogRef.close(true);
  }
}
