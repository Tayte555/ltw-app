import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
