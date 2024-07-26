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
  estoyLogueado: boolean = false;

  constructor(private fb: FormBuilder, private loginService: LoginService, private authService: AuthService, private router: Router, private navesService: NavesService) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  token: any;
  errorMessageEmail: string | null = null;
  errorMessagePassword: string | null = null;




  ngOnInit() {
    this.estoyLogueado = this.loginService.isAuthenticated();
    this.loginForm.reset();
    this.errorMessageEmail = '';
    this.errorMessagePassword = '';
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
          localStorage.setItem('accessToken', response.accessToken);
          alert('Login successful');
          const url = encodeURIComponent(this.navesService.getMyUrl());
          this.loginForm.reset();
          if (url) {
            this.router.navigate([url]);
          } else {
            this.router.navigate(['starships']);
          }

        },
        (error: any) => {
          console.error('Login failed', error.statusText === 'Bad Request' ? 'El usuario no existe' : error.statusText);
          alert('Login error: ' + error.statusText === 'Bad Request' ? 'El usuario no existe' : error.statusText);
          this.errorMessageEmail = 'Login failed. Please check your credentials and try again.';
        }
      );
    } else if (this.loginForm.get(['email'])?.errors) {
      console.log(this.loginForm);
      this.loginForm.setErrors({ customError: 'email' });
      console.log(this.loginForm);
      this.errorMessageEmail = "El email no es válido";
    } else if (this.loginForm.get(['password'])?.errors) {
      console.log(this.loginForm);
      this.loginForm.setErrors({ customError: 'password' });
      console.log(this.loginForm);
      this.errorMessagePassword = "La contraseña no es válida";
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  borrarUsuario() {

  }
}
