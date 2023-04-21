# Práctica 11 - Creación de una aplicación Express para gestionar el registro de Funko Pops
## Desarrollo de Sistemas Informáticos

> **Nombre:** Iván García González **Correo:** alu0101388786@ull.edu.es
<p align="center">
  <a href='https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-Ivan-Garcia02?branch=main'>
    <img src='https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-Ivan-Garcia02/badge.svg?branch=main' alt='Coverage Status'>
  </a>

  <a href="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-Ivan-Garcia02/actions/workflows/node.js.yml">
    <img alt="Tests" src="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-Ivan-Garcia02/actions/workflows/node.js.yml/badge.svg">
  </a>

  <a href="https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-Ivan-Garcia02">
    <img alt="Quality Gate Status" src="https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-Ivan-Garcia02&metric=alert_status">
  </a>
</p>


## Índice
- [Objetivos](#objetivos-de-la-práctica)
- [Ejercicios propuestos](#ejercicios-propuestos)
  - [Funko-App HTTP](#funko-app---servidor-express)
- [Ejercicio modificación](#ejercicio-modificación)
- [Conclusiones](#conclusiones)
- [Bibliografía](#bibliografía)


## Objetivos de la práctica
En esta práctica vamos a profundizar en los conceptos explicados en clase, sobre Node.js, las APIs asíncronas de gestión del sistema de ficheros (módulo `fs`), de creación de procesos (módulo `child_process`) y de creación de servidores express de HTML (módulo `Express`) de Node.js.

## Ejercicios propuestos
### Funko App - Servidor Express
Para este ejercicio nos pedían, que partiendo de la implementación de la práctica anterior de *FunkoApp*, escribiéramos un servidor HTTP escrito con Express, tal que desde un cliente como, por ejemplo, ThunderClient o Postman, se podrán llevar a cabo peticiones HTTP al servidor. Por ello, para empezar tenemos el fichero `funko.ts` que contiene la declaración de la clase `Funko` para declarar funkos. 
También tenemos en el fichero `types.ts`, nuestros propios tipos para modelar una respuesta desde el servidor al cliente.

#### funkoFiles.ts
En este fichero tenemos la definición de varias callback que usa el servidor, entre ellas tenemos las funciones `writeFunkoFile` y `existeID`, que ya teníamos definidas en las prácticas anteriores y las hemos convertido a callbacks. Otra callback que encontramos aquí es `getFunkos` que usamos para inicializar todos los ficheros de funkos de un usuario en un array de `Funkos`, este código lo hemos reutilizado de la práctica anterior y lo hemos encapsulado en un callback.

#### servidorExpress.ts
Lo primero que hacemos es crear el servidor con `const app = express()` y ponernos a escuchar en el puerto correspondiente. 
```typescript
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
```

- **Get:** Cuando se realiza una petición `get`, en la ruta `/funkos`, lo primero que hacemos es comprobar que se ha introducido un usuario, y si no es así, eviamos un error al cliente. A continuación, llamamos a la callback `getFunkos` para inicializar el array de Funkos y trabajar sobre él, si no ha habido errores continuamos y en el caso de que como parámetro se haya introducido un ID haremos un *show* Funko, buscando el funko en el array y devolviendolo al cliente. En caso de que no se haya introducido ID haremos un *list*, en el que crearemos la respuesta en la que incluimos el array con todos los funkos, y lo enviamos al cliente.

- **Post:** Cuando se realiza una petición `post`, en la ruta `/funkos`, lo primero que hacemos es comprobar que se ha introducido un usuario y todos los parámetros de un Funko, y si no es así, eviamos un error al cliente. A continuación, llamamos a la callback `getFunkos` para inicializar el array de Funkos y trabajar sobre él, si no ha habido errores continuamos y realizamos la operacion de añadir Funko, llamando a `existeID` y a `writeFunkoFile`, finalmente crearemos la respuesta en la que indicamos si todo fue bien y el tipo de operación, y lo enviamos al cliente.

- **Delete:** Cuando se realiza una petición `delete`, en la ruta `/funkos`, lo primero que hacemos es comprobar que se ha introducido un usuario y todos los parámetros de un Funko, y si no es así, eviamos un error al cliente. A continuación, llamamos a la callback `getFunkos` para inicializar el array de Funkos y trabajar sobre él, si no ha habido errores continuamos y realizamos la operacion de eliminar Funko, llamando a `existeID` y utilizando `rm`, finalmente crearemos la respuesta en la que indicamos si todo fue bien y el tipo de operación, y lo enviamos al cliente.

- **Patch:** Cuando se realiza una petición `patch`, en la ruta `/funkos`, lo primero que hacemos es comprobar que se ha introducido un usuario y todos los parámetros de un Funko, y si no es así, eviamos un error al cliente. A continuación, llamamos a la callback `getFunkos` para inicializar el array de Funkos y trabajar sobre él, si no ha habido errores continuamos y realizamos la operacion de modificar Funko, llamando a `existeID` y a `writeFunkoFile`, finalmente crearemos la respuesta en la que indicamos si todo fue bien y el tipo de operación, y lo enviamos al cliente.


Por último, en caso de recibir un `get` con cualquier otra ruta que no sea `/execmd`, enviamos un código de status *404*.
```typescript
app.get('*', (_, res) => {
  res.status(404).send();
});
```


## Ejercicio Modificación
En este ejercicio nos pedían escribir un servidor express de HTTP. De tal forma que el cliente hiciera una petición de un comando a ejecutar al servidor, el servidor la ejecuta y le envía la salida del comando al cliente.

Lo primero que hacemos es crear el servidor con `const app = express()` y ponernos a escuchar en el puerto correspondiente. 
```typescript
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
```

A continuación, cuando se realiza una peticion `get` con la ruta correcta `/execmd`, comprobamos que existe el argumento `cmd` en la petición y si no es así enviamos un código de status *400*. En el caso de incluir el comando, creamos un proceso con `exec` para ejecutarlo. Después obtenemos la información de salida del comando y la enviamos al cliente, en caso de que el comando a ejecutar o los argumentos sean incorrectos enviamos el mensaje de error y un código de status *500*. Y en caso de que todo haya salido bien enviamos la salida del comando al cliente.
```typescript
app.get('/execmd', (req, res) => {
  if (!req.query.cmd) {
    res.status(400).send();
  }
  else {
    let comando: string = req.query.cmd as string;
    if (req.query.args) {
      comando += ' ' + req.query.args as string;
    }

    exec(comando, (error, stdout, stderr) => {
      if (error) {
        res.status(500);
        res.send({
          error: error,
          errorText: stderr
        })
      }
      else {
        res.send({
          output: stdout
        })
      }
    }); 
  }
});
```

Por último, en caso de recibir un `get` con cualquier otra ruta que no sea `/execmd`, enviamos un código de status *404*.
```typescript
app.get('*', (_, res) => {
  res.status(404).send();
});
```

## Conclusiones
En esta práctica hemos realizado varios ejercicios con los que hemos practicado los conceptos explicados en clase, sobre Node.js, las APIs asíncronas de gestión del sistema de ficheros (módulo `fs`), de creación de procesos (módulo `child_process`) y de creación de servidores express de HTML (módulo `Express`) de Node.js.

En concreto, he practicado más profundamente las funciones de la API asíncrona de Node.js, `writefile`, `readfile`, `access`, `mkdir` y `rm`. Además de los tipos de peticiones de `Express`, `get`, `post`, `patch` y `delete`.


## Bibliografía
- [Guion de la práctica](https://ull-esit-inf-dsi-2223.github.io/prct11-http-express-funko-app/)
- [Apuntes de la asignatura](https://ull-esit-inf-dsi-2223.github.io/nodejs-theory/)