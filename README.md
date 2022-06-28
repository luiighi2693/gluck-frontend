# Gluck

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



build image

docker build -t pruebacontainerluighi2693/gluck-frontend:latest .

push dockerhub

docker push pruebacontainerluighi2693/gluck-frontend:latest


deploy 

docker pull pruebacontainerluighi2693/gluck-frontend:latest
docker run -d -p 80:80 pruebacontainerluighi2693/gluck-frontend:latest


docker stop $(docker ps | grep 'gluck-frontend:latest' | awk '{print $1}')
docker rm $(docker ps -a | grep 'gluck-frontend:latest' | awk '{print $1}')
docker image rm $(docker image ls | grep 'pruebacontainerluighi2693/gluck-frontend' | grep -v 'site' | awk '{print $3}')
docker run -d -p 80:80 pruebacontainerluighi2693/gluck-frontend:latest
