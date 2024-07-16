import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:3000/users', this.registerForm.value).subscribe(
        response => {
          console.log('User registered successfully:', response);
          this.navegarALogin();
        },
        error => {
          console.error('Error during registration:', error);
        }
      );
    }
  }

  navegarALogin() {
    this.router.navigate(['login']).then(success => {
      console.log('Navigated to login:', success);
    }).catch(err => {
      console.error('Navigation to login failed:', err);
    });
  }

  navegarASignUp() {
    this.router.navigate(['register']);
  }
}
