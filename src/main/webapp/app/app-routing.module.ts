import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#MufFeAdminModule'
                },
                {
                    path: 'pages',
                    loadChildren: './pages/pages.module#MufFePagesModule'
                },
                ...LAYOUT_ROUTES
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED, onSameUrlNavigation: 'reload' }
        )
    ],
    exports: [RouterModule]
})
export class MufFeAppRoutingModule {}
