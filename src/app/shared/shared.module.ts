import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatGridListModule, MatNativeDateModule, MatProgressSpinnerModule, MatDatepickerModule, MatToolbarModule, MatTabsModule, MatTableModule, MatDialogModule, MatSelectModule} from '@angular/material';
import { MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from './_services/validation.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderService } from './_services/loader.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  declarations: [],
  providers: [
    LoaderService,
    ValidationService
  ]
})
export class SharedModule { }
