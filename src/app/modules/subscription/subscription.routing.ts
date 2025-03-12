import { Route } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';

export const subscriptionRoutes: Route[] = [
    {
        path: 'start',
        //path: 'plan/:productId/start',
        component: SubscriptionComponent
    }
];

