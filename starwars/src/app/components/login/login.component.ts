import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { iLogin } from '../../interfaces/usuarios';
import { HeaderComponent } from "../header/header.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavesService } from '../../services/naves.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService, private authService: AuthService, private router: Router, private navesService: NavesService) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  token: any;
  errorMessage: string | null = null;

  ngOnInit() {
    this.loginForm.reset();
    this.loginForm.value.email = '';
    this.loginForm.value.password = '';
  }

  verificarLogin() {
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      const loginData: iLogin = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      };
      this.loginService.login(loginData).subscribe(
        (response: any) => {
          localStorage.setItem('authToken', response.accessToken);
          console.log('Login successful', response);
          const url = encodeURIComponent(this.navesService.getMyUrl());
          this.router.navigate([url]);
        },
        (error: any) => {
          console.error('Login failed', error);
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  borrarUsuario() {

  }
}
