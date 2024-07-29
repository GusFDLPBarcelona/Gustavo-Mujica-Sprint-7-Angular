import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { NavesService } from '../../services/naves.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  estoyLogueado?: boolean;
  registerForm: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private loginService: LoginService, private cd: ChangeDetectorRef, private navesService: NavesService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.estoyLogueado = this.loginService.isAuthenticated();
  }

  navegarALogin() {
    this.router.navigate(['login']);
  }

  navegarASignUp() {
    this.navesService.clearMyUrl();
    this.router.navigate(['register']);
  }

  logOut(): void {
    this.estoyLogueado = false;
    this.cd.detectChanges();
    this.loginService.logOut();
    this.navesService.getUrl('');
    this.router.navigate(['home']);
  }

  irAStarships() {
    this.navesService.getUrl('starships');
    this.router.navigate(['starships']);
  }
}
