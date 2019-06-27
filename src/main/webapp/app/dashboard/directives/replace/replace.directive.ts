import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:max-line-length
  selector: '[jhiHostReplace], jhi-aside, jhi-breadcrumbs, jhi-footer, jhi-header, jhi-sidebar, jhi-sidebar-footer, jhi-sidebar-form, jhi-sidebar-header, jhi-sidebar-minimizer, jhi-sidebar-nav, jhi-sidebar-nav-dropdown, jhi-sidebar-nav-item, jhi-sidebar-nav-link, jhi-sidebar-nav-title'
})
export class ReplaceDirective implements OnInit {

  constructor(private el: ElementRef) { }

  // wait for the component to render completely
  ngOnInit() {
    const nativeElement: HTMLElement = this.el.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
  }
}
