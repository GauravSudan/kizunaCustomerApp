import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { startRoutes } from './start.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StartComponent } from './start.component';
import { CommonModule } from '@angular/common';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from 'src/app/api/auth/auth.service';
import { MatProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        StartComponent
    ],
    imports: [
        RouterModule.forChild(startRoutes),
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCheckboxModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatStepperModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatToolbarModule,
        MatDialogModule,
        MatProgressSpinnerModule 
    ],
    providers:[AuthService]
})
export class StartModule { }
