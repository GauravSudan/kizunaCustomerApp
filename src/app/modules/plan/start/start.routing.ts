import { Route } from '@angular/router';
import { StartComponent } from './start.component';

export const startRoutes: Route[] = [
    {
        path: '',
        //path: 'plan/:productId',
        component: StartComponent
    }
];

