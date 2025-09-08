import { NgIf } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user: any;
  isUserDropdownOpen = false;

  constructor(
    private userService: UserService,
    private eRef: ElementRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.error('Failed to load user:', err);
      },
    });
  }

  toggleUserDropdown(): void {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (
      this.isUserDropdownOpen &&
      !this.eRef.nativeElement.contains(event.target)
    ) {
      this.isUserDropdownOpen = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
