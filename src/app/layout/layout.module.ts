import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { ModernLayoutModule } from 'src/app/layout/layouts/horizontal/modern/modern.module';

const layoutModules = [
    ModernLayoutModule
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        MatIconModule,
        ...layoutModules,
    ],
    exports     : [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule
{
}
