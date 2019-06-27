import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

/* atiila-needle-import-pages - atiila will add entity imports here */

export const PAGES_ROUTE: Route[] = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'home.title'
        }
    }
    /* atiila-needle-add-pages-route - atiila will add page route here */
];
