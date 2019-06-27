import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'jhi-breadcrumbs',
  template: `
  <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs" let-last = last>
    <li class="breadcrumb-item"
        *ngIf="breadcrumb.label.pageTitle&&breadcrumb.url.substring(breadcrumb.url.length-1) == '/'||breadcrumb.label.pageTitle&&last"
        [ngClass]="{active: last}">
      <a *ngIf="!last" [routerLink]="breadcrumb.url">{{breadcrumb.label.pageTitle|translate}}</a>
      <span *ngIf="last" [routerLink]="breadcrumb.url">{{breadcrumb.label.pageTitle|translate}}</span>
    </li>
  </ng-template>`
})
export class AppBreadcrumbsComponent {
  breadcrumbs: Array<Object>;
  constructor(
    private router: Router,
    private actroute: ActivatedRoute
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.breadcrumbs = [];
      let currentRoute = this.actroute.root,
      curl = '';
      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null;
        childrenRoutes.forEach(route => {
          if (route.outlet === 'primary') {
            const routeSnapshot = route.snapshot;
            curl += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
            this.breadcrumbs.push({
              label: route.snapshot.data,
              url: curl
            });
            currentRoute = route;
          }
        });
      } while (currentRoute);
    });
  }
}
