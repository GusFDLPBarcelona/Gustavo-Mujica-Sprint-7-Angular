import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';
import { ListaNavesComponent } from './app/components/lista-naves/lista-naves.component';
import { provideHttpClient } from '@angular/common/http';
import { DetalleNavesComponent } from './app/components/detalle-naves/detalle-naves.component';
import { NaveResolver } from './app/services/nave-resolver.service';
import { LoginComponent } from './app/components/login/login.component';
import { importProvidersFrom } from '@angular/core';
import { RegisterComponent } from './app/components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { authGuard } from './app/guard/auth.guard';


export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: 'full' },
  { path: "home", component: HomeComponent, pathMatch: 'full' },
  { path: "starships", component: ListaNavesComponent, pathMatch: 'full' },
  { path: "login", component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: ":nave.url", component: DetalleNavesComponent, resolve: { nave: NaveResolver }, pathMatch: 'full', canActivate: [authGuard] },

]

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(RouterModule, ReactiveFormsModule),
  ]
})
  .catch((err: any) => console.error(err));

