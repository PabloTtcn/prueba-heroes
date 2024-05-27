Buenas, respecto a la prueba un par de cosas a comentar:

- he intentado usar logicas básicas y métodos más complejos,
 para cubrir la mayor forma de hacer las cosas.

-no he incluido diccionarios ni un diseño alternativo para movil, 
he hecho programación reactivas con el mismo diseño desktop

-no me he preocupado demasiado del diseño, sino más de las funcionalidades
 
-al hacer ng test saltaran varios errores respecto a la inyeccion del servicio, 
esto es porque al ser standalone los componentes se conectan a traves del bootstrap en main.ts y no se detecta

# Heroes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
