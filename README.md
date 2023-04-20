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
  - [Funko-App HTTP]()
- [Ejercicio modificación](#ejercicio-modificación)
- [Conclusiones](#conclusiones)
- [Bibliografía](#bibliografía)


## Objetivos de la práctica
En esta práctica vamos a profundizar en los conceptos explicados en clase, sobre Node.js, las APIs asíncronas de gestión del sistema de ficheros (módulo `fs`), de creación de procesos (módulo `child_process`) y de creación de sockets (módulo `net`) de Node.js. y los paquetes `yargs` y `chalk`.


## Ejercicios propuestos
### Ejercicio 3 - Cliente y servidor para aplicación de registro de Funko Pops
Para este ejercicio nos pedían, que partiendo de la implementación de la práctica anterior de *FunkoApp*, escribiéramos un servidor y un cliente haciendo uso de los sockets proporcionados por el módulo net de Node.js. Por ello tenemos el fichero `funko.ts` que contiene la declaración de la clase `Funko` para declarar funkos.

#### servidor.ts
El servidor será el encargado de procesar la petición, preparar y envíar una respuesta de vuelta al cliente, es por ello que lo primero que hacemos es crear el servidor con `net.createServer((connection)` y ponernos a escuchar en el puerto correspondiente. A continuación, cuando recibamos un evento `data`, lo parseamos, y creamos el array de funkos a partir de los ficheros correspondientes al usuario de la petición, para ello usamos las funciones asíncronas `access`, `readdir` y `readFile` y cuando estas hayan terminado de analizar todos los ficheros e incluirlos a la colección de Funkos, emitiremos un evento con el tipo de petición a realizar:

- **add:** Lo primero que haremos es parsear el mensaje, para sí no existe el ID a incluir en la colección, crearlo y guardarlo en ficheros haciendo uso de la función `writeFunkoFile` que hará uso de las funciones asíncronas `access`, `mkdir` y `writeFile`. A continuación, creamos la respuesta, la enviamos al cliente y cerramos la conexión con este. En caso de que el ID existiese mandamos un mensaje con el valor `sucess` a *false*.

- **update:** Lo primero que haremos es parsear el mensaje, para sí existe el ID a modificar en la colección, modificarlo y guardarlo en ficheros haciendo uso de la función `writeFunkoFile` que hará uso de las funciones asíncronas `access`, `mkdir` y `writeFile`. A continuación, creamos la respuesta, la enviamos al cliente y cerramos la conexión con este. En caso de que el ID no existiese mandamos un mensaje con el valor `sucess` a *false*.

- **remove:** Lo primero que haremos es parsear el mensaje, para sí existe el ID a eliminar de la colección, eliminarlo de los ficheros haciendo uso de las función asincrona `rm`. A continuación, creamos la respuesta, la enviamos al cliente y cerramos la conexión con este. En caso de que el ID no existiese mandamos un mensaje con el valor `sucess` a *false*.

- **show:** Lo primero que haremos es parsear el mensaje, para sí existe el ID a mostrar de la colección, crear la respuesta en la que incluimos un array con el funko a mostrar y enviarlo al cliente y cerramos la conexión con este. En caso de que el ID no existiese mandamos un mensaje con el valor `sucess` a *false*.

- **list:** Lo primero que haremos es parsear el mensaje, después creamos la respuesta en la que incluimos un array con los funkos a mostrar y enviarlos al cliente y cerramos la conexión con este.

#### cliente.ts
El cliente será el encargado de haciendo uso de `yargs`, se introduzcan todos los datos y el comando a ejecutar, para construir una petición y mandársela al servidor. Para ello con `yargs` obtenemos todos los datos necesarios, al igual que en la práctica anterior, para guardarlos en unas variables globales que usará el cliente.

A continuación, creamos una conexión con el servidor con `net` y aprovechamos para, desde la conexión, realizar un envío de datos al servidor con `write`, en la que en formato JSON enviamos la petición que construimos en el yargs.

Después, cuando reciba datos los irá almacenando en `wholeData`, para cuando el servidor emite un evento `end` y cierre la conexión, el cliente parsea los datos recibidos y en un `switch-case` según el comando a ejecutar y si hubo exito o no, imprimir un mensaje personalizado de exito o no (haciendo uso de `chalk`) y en el caso de mostrar funkos imprimir los funkos también.






## Ejercicio Modificación
En este ejercicio nos pedían escribir un servidor express de HTTP. De tal forma que el cliente hiciera una petición de un comando a ejecutar al servidor, el servidor la ejecuta y le envía la salida del comando al cliente.

Lo primero que hacemos es crear el servidor con `const app = express()` y ponernos a escuchar en el puerto correspondiente. 
```typescript
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
```

A continuación, cuando se realiza una peticion `get` con la ruta correcta `/execmd`, comprobamos que existe el argumento `cmd` en la petición y si no es así enviamos un codigo de status *400*. En el caso de incluir el comando, creamos un proceso con `exec` para ejecutarlo. Después obtenemos la información de salida del comando y la enviamos al cliente, en caso de que el comando a ejecutar o los argumentos sean incorrectos enviamos el mensaje de error y un codigo de status *500*. Y en caso de que todo haya salido bien enviamos la salida del comando al cliente.
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

Por último, en caso de recibir un `get` con cualquier otra ruta que no sea `/execmd`, enviamos un codigo de status *404*.
```typescript
app.get('*', (_, res) => {
  res.status(404).send();
});
```

## Conclusiones
En esta práctica hemos realizado varios ejercicios con los que hemos practicado los conceptos explicados en clase, sobre Node.js, las APIs asíncronas de gestión del sistema de ficheros (módulo `fs`), de creación de procesos (módulo `child_process`) y de creación de sockets (módulo `net`) de Node.js. y los paquetes `yargs` y `chalk`.

En concreto, he practicado más profundamente las funciones de la API asíncrona de Node.js, `writefile`, `readfile`, `access`, `mkdir` y `rm`. Además de los eventos a emitir por sockets `data`, `end`...

## Bibliografía
- [Guion de la práctica](https://ull-esit-inf-dsi-2223.github.io/prct11-http-express-funko-app/)
- [Apuntes de la asignatura](https://ull-esit-inf-dsi-2223.github.io/nodejs-theory/)