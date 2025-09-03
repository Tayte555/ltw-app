import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Form submitted');

    if (this.form.invalid) {
      console.warn('Form is invalid');
      return;
    }

    const { email, password } = this.form.value;

    this.authService.login({ email, password }).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        alert('Login successful!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login error:', err);
        alert(err.error.message || 'Login failed');
      },
    });
  }
}
