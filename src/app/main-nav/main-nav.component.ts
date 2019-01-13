import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  themeDark = 'theme-dark';
  themeLight = 'theme-light';
  themeCustom = 'theme-custom';
  currentTheme = this.themeLight;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private overlay: OverlayContainer) {}

  ngOnInit() {
    this.currentTheme = this.getCurrentThemeName();
    this.changeTheme(this.currentTheme);
  }

  changeTheme(theme: string): any {
    const overlayClasses = this.overlay.getContainerElement().classList;
    this.removeExistingClassOf(overlayClasses);
    overlayClasses.add(theme);

    const bodyClassList = document.body.classList;
    this.removeExistingClassOf(bodyClassList);
    bodyClassList.add(theme);

    this.currentTheme = theme;
    localStorage.setItem('app-theme', theme);
  }

  removeExistingClassOf(element: any): void {
    const classToRemove = Array.from(element).filter((item: string) => {
      return item.indexOf('theme-') > -1;
    });

    if (classToRemove.length) {
      element.remove(...classToRemove);
    }
  }

  getCurrentThemeName(): string {
    const themeName = localStorage.getItem('app-theme');
    return (themeName) ? themeName : this.themeLight;
  }

}
