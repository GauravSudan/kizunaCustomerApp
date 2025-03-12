import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SubscriptionComponent } from './subscription.component';
import { subscriptionRoutes } from './subscription.routing';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatToolbarModule } from '@angular/material/toolbar';
import { unitinfoComponent } from './unitinfo/unitinfo.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { VerifyComponent } from 'src/app/shared/verify/verify.component';
import { usermanualdownloadComponent } from './usermanualdownload/usermanualdownload.component';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { MatPaginatorModule } from '@angular/material/paginator'; // Import MatPaginatorModule
import { AuthService } from 'src/app/api/auth/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        SubscriptionComponent,
        unitinfoComponent,
        VerifyComponent,
        usermanualdownloadComponent
    ],
    imports: [
        RouterModule.forChild(subscriptionRoutes),
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

        MatTableModule,       // Add MatTableModule
        MatPaginatorModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        CommonModule
    ],
    providers: [AuthService]
})
export class SubscriptionModule { }
