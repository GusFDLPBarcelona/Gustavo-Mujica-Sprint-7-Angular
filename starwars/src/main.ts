import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';
import { ListaNavesComponent } from './app/components/lista-naves/lista-naves.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { DetalleNavesComponent } from './app/components/detalle-naves/detalle-naves.component';
import { NaveResolver } from './app/services/nave-resolver.service';


export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: 'full' },
  { path: "home", component: HomeComponent, pathMatch: 'full' },
  { path: "starships", component: ListaNavesComponent, pathMatch: 'full' },
  {
    path: ":nave.url", component: DetalleNavesComponent, resolve: {
      nave: NaveResolver
    }
  }
]

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(RouterModule)
  ]
}
).catch((err) => console.error(err));

