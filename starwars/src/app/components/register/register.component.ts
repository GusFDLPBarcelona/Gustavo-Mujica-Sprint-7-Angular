import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { LoginService } from '../../services/login.service';
import { iUsuario } from '../../interfaces/usuarios';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private loginService: LoginService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.registerForm.reset();
  }

  onSubmit() {
    this.loginService.registrarUsuario(this.registerForm.value as iUsuario).subscribe((respuesta) => {
      console.log(respuesta);
    })
  }
}
