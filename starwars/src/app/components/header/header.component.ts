import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input('estoyLogueado') estoyLogueado?: boolean;

  registerForm: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private loginService: LoginService, private cd: ChangeDetectorRef) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.estoyLogueado = this.loginService.isAuthenticated();
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
    this.router.navigate(['login']);
  }

  navegarASignUp() {
    this.router.navigate(['register']);
  }

  logOut(): void {
    this.estoyLogueado = false;
    this.cd.detectChanges();
    this.loginService.logOut();
    this.router.navigate(['home']);
  }
}
