import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  navegarALogin() {
    throw new Error('Method not implemented.');
  }


  ngOnInit() {
    console.log("login component!!!");
  }
}
