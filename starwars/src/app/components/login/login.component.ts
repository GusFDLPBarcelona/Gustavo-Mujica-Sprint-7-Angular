import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { iLogin } from '../../interfaces/usuarios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  token: any;

  constructor(private loginService: LoginService) { }


  navegarALogin() {
    throw new Error('Method not implemented.');
  }


  ngOnInit() {
    this.loginForm.reset();
  }

  verificarLogin(): any {
    this.loginService.login(this.loginForm.value as iLogin).subscribe((token) => {
      console.log(token);
      this.token = token;
    })
  }






}
