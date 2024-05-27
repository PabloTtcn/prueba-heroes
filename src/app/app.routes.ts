import { Routes, provideRouter } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { bootstrapApplication } from '@angular/platform-browser';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        loadComponent: () => 
            import('./core/components/dashboard/dashboard.component')
                .then(m => m.DashboardComponent)
    },
    {
        path: 'crearEditarHeroe/:id',
        loadComponent: () => 
            import('./core/components/crear-editar-heroe/crear-editar-heroe.component')
                .then(m => m.CrearEditarHeroeComponent)
    },
    { 
        path: '**', 
        component: PageNotFoundComponent 
    },  
];
bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes)
    ]
  }).catch(err => console.error(err));
