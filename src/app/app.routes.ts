import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ListaNavesComponent } from './components/lista-naves/lista-naves.component';
import { DetalleNavesComponent } from './components/detalle-naves/detalle-naves.component';
import { authGuard } from './guard/auth.guard';
import { NaveResolver } from './services/nave-resolver.service';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'starships', component: ListaNavesComponent, canActivate: [authGuard] },
  { path: ':naveUrl', component: DetalleNavesComponent, canActivate: [authGuard], resolve: { nave: NaveResolver } },
];
