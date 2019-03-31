# Hnfeed PoC Site

This site is an example created on Angular 7 - Node.js / Express - MongoDB.

## How to run it

For running this project you need to run two projects (Server and Web).

### Server

Before of all please add a file .env on folder server with secret data. Then...

On your terminal, inside folder.

```bash
cd server
yarn install
yarn start
```

When server is running use this endpoint for refresh feeds data <http://localhost:3000/reset>

### Web

For running this you need to have installed angular cli previously. <https://angular.io/guide/quickstart>

```bash
npm install -g @angular/cli
```

After that on your terminal change directory to the root of the project and execute the following commands.

```bash
npm install
ng serve
```

The site is going to be available on <http://localhost:4200/>
