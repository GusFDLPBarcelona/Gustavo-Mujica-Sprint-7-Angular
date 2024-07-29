import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { LoginService } from '../../services/login.service';
import { iUsuario } from '../../interfaces/usuarios';
import { NavesService } from '../../services/naves.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  estoyLogueado: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService, private navesService: NavesService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.estoyLogueado = this.loginService.isAuthenticated();
    this.registerForm.reset();
  }

  onSubmit() {
    try {
      if (this.registerForm.valid) {
        this.loginService.registrarUsuario(this.registerForm.value as iUsuario).subscribe((respuesta) => {
          const url = encodeURIComponent(this.navesService.getMyUrl());
          localStorage.setItem("accessToken", respuesta.accessToken);
          if (url) {
            this.router.navigate([url]);
          } else {
            this.router.navigate(['home']);
          }
        },
          (error: any) => {
            alert('El usuario ya existe.');
          });
        this.registerForm.reset();
      }
    } catch (error) {
    }


  }

}