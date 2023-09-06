import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { CdkTableModule} from '@angular/cdk/table';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { NgxMaskModule } from "ngx-mask";

const MODULES = [
  MatIconModule,
  MatTableModule,
  CdkTableModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatSelectModule,
  MatGridListModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatPaginatorModule,
  MatSortModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatMenuModule,
  NgxMaskModule.forRoot()
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class MaterialModule { }
