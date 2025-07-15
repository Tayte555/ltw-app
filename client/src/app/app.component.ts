import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import {
  Router,
  NavigationEnd,
  RouterOutlet,
  RouterModule,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Winner Stays On';
  showNavbar = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.urlAfterRedirects;
        this.showNavbar = !['/login', '/register'].includes(currentUrl);
      });
  }
}
