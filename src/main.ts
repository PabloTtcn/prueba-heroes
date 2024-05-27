import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Routes, provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { PageNotFoundComponent } from './app/shared/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      redirectTo: 'dashboard'
  },
  {
      path: 'dashboard',
      loadComponent: () => 
          import('./app/core/components/dashboard/dashboard.component')
              .then(m => m.DashboardComponent)
  },
  {
      path: 'crearEditarHeroe/:id',
      loadComponent: () => 
          import('./app/core/components/crear-editar-heroe/crear-editar-heroe.component')
              .then(m => m.CrearEditarHeroeComponent)
  },
  { 
      path: '**', 
      component: PageNotFoundComponent 
  },  
];
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(BrowserAnimationsModule) 
  ]
}).catch(err => console.error(err));