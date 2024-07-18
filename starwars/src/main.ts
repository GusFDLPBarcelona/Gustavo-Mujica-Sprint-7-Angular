import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';
import { ListaNavesComponent } from './app/components/lista-naves/lista-naves.component';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DetalleNavesComponent } from './app/components/detalle-naves/detalle-naves.component';
import { NaveResolver } from './app/services/nave-resolver.service';
import { LoginComponent } from './app/components/login/login.component';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { RegisterComponent } from './app/components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../src/app/services/auth.service';
import { AuthInterceptor } from '../src/app/auth.interceptor';
import { verificarGuard } from '../src/app/guard/verificar.guard';


export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: 'full' },
  { path: "home", component: HomeComponent, pathMatch: 'full' },
  { path: "starships", component: ListaNavesComponent, pathMatch: 'full' },
  { path: "login", component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: ":nave.url", component: DetalleNavesComponent, resolve: { nave: NaveResolver }, pathMatch: 'full' },

]

function intializeApp(authService: AuthService) {
  return (): Promise<void> => authService.getToken().toPromise().then(() => { });

}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(RouterModule, ReactiveFormsModule),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AuthService], multi: true },

  ]
})
  .catch((err) => console.error(err));

