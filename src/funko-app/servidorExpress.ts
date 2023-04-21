import express from 'express';
import { rm } from 'fs';
import { ResponseType } from "./types.js";
import { Funko, convertGeneroFunko, convertTipoFunko } from "./funko.js";
import { getFunkos, existeID, writeFunkoFile } from './funkoFiles.js';


const app = express();
let funkoPops: Funko[] = [];

app.get('/funkos', (req, res) => {
  if (!req.query.user) {
    res.send({
      error: 'Debe especificarse un usuario',
    });

  } else {
    getFunkos(req.query.user as string, (err, data) => {
      if (err) {
        res.send({
          error: err,
        });
      } else {
        if(data !== undefined) {
          funkoPops = data;
        }

        if (!req.query.ID) { // List
          console.log('Un cliente quiere listar');
          let respuesta: ResponseType = {type: 'list', success: true, funkoPops: []};
          for(let i = 0; i < funkoPops.length; i++) {
            respuesta.funkoPops?.push({ID: funkoPops[i].ID, nombre: funkoPops[i].nombre, descripcion: funkoPops[i].descripcion, tipo: funkoPops[i].tipo, genero: funkoPops[i].genero, franquicia: funkoPops[i].franquicia, numeroFranquicia: funkoPops[i].numeroFranquicia, exclusivo: funkoPops[i].exclusivo, caracteristicasEspeciales: funkoPops[i].caracteristicasEspeciales, valorMercado: funkoPops[i].valorMercado});
          }

          res.send({
            respuesta: respuesta
          });
        }

        else { // Show
          console.log('Un cliente quiere mostrar');
          let respuesta: ResponseType = {type: 'show', success: false, funkoPops: []};
          
          existeID(funkoPops, Number(req.query.ID), (err, index) => {
            if (!err) {
              if (index !== -1) { // Existe el ID
                respuesta.success = true;
                respuesta.funkoPops?.push({ID: funkoPops[index].ID, nombre: funkoPops[index].nombre, descripcion: funkoPops[index].descripcion, tipo: funkoPops[index].tipo, genero: funkoPops[index].genero, franquicia: funkoPops[index].franquicia, numeroFranquicia: funkoPops[index].numeroFranquicia, exclusivo: funkoPops[index].exclusivo, caracteristicasEspeciales: funkoPops[index].caracteristicasEspeciales, valorMercado: funkoPops[index].valorMercado});
              }

              res.send({
                respuesta: respuesta
              });
            }
          })
        }
      }
    });
  }
});


app.post('/funkos', (req, res) => {
  if (!req.query.user || !req.query.ID || !req.query.nombre || !req.query.descripcion || !req.query.tipo || !req.query.genero || !req.query.franquicia || !req.query.numeroFranquicia || !req.query.exclusivo || !req.query.caracteristicasEspeciales || !req.query.valorMercado) {
    res.send({error: 'Debe especificarse un usuario, un ID y todos los parametros de un funko: nombre, descripcion, tipo, genero, franquicia, numeroFranquicia, exclusivo, caracteristicasEspeciales y valorMercado',
    });

  } else {
    console.log('Un cliente quiere añadir');
    getFunkos(req.query.user as string, (err, data) => {
      if (err) {
        res.send({
          error: err,
        });
      } else {
        if(data !== undefined) {
          funkoPops = data;
        }

        let respuesta: ResponseType = {type: 'add', success: false};

        existeID(funkoPops, Number(req.query.ID), (err, index) => {
          if (!err) {
            if (index === -1) { // NO existe el ID
              respuesta.success = true;
              writeFunkoFile(String(req.query.user), Number(req.query.ID), String(req.query.nombre), String(req.query.descripcion), convertTipoFunko(String(req.query.tipo)), convertGeneroFunko(String(req.query.genero)), String(req.query.franquicia), Number(req.query.numeroFranquicia), Boolean(req.query.exclusivo), String(req.query.caracteristicasEspeciales), Number(req.query.valorMercado), (error) => {});
            }
            
            res.send({
              respuesta: respuesta
            });
          }
        });
      }
    });
  }
});


app.delete('/funkos', (req, res) => {
  if (!req.query.user || !req.query.ID) {
    res.send({
      error: 'Debe especificarse un usuario y un ID',
    });

  } else {
    console.log('Un cliente quiere eliminar');
    getFunkos(req.query.user as string, (err, data) => {
      if (err) {
        res.send({
          error: err,
        });
      } else {
        if(data !== undefined) {
          funkoPops = data;
        }

        let respuesta: ResponseType = {type: 'remove', success: false};
        existeID(funkoPops, Number(req.query.ID), (err, index) => {
          if(!err) {
            if (index !== -1) { // Existe el ID
              respuesta.success = true;
              rm('./data/' + req.query.user + '/' + req.query.ID + '.json', () => {});
            }

            res.send({
              respuesta: respuesta
            });
          }
        });
      }
    });
  }
});


app.patch('/funkos', (req, res) => {
  if (!req.query.user || !req.query.ID || !req.query.nombre || !req.query.descripcion || !req.query.tipo || !req.query.genero || !req.query.franquicia || !req.query.numeroFranquicia || !req.query.exclusivo || !req.query.caracteristicasEspeciales || !req.query.valorMercado) {
    res.send({error: 'Debe especificarse un usuario, un ID y todos los parametros de un funko: nombre, descripcion, tipo, genero, franquicia, numeroFranquicia, exclusivo, caracteristicasEspeciales y valorMercado',
    });

  } else {
    console.log('Un cliente quiere modificar');
    getFunkos(req.query.user as string, (err, data) => {
      if (err) {
        res.send({
          error: err,
        });
      } else {
        if(data !== undefined) {
          funkoPops = data;
        }

        let respuesta: ResponseType = {type: 'update', success: false};
        existeID(funkoPops, Number(req.query.ID), (err, index) => {
          if (!err) {
            if (index !== -1) { // Existe el ID
              respuesta.success = true;
              writeFunkoFile(String(req.query.user), Number(req.query.ID), String(req.query.nombre), String(req.query.descripcion), convertTipoFunko(String(req.query.tipo)), convertGeneroFunko(String(req.query.genero)), String(req.query.franquicia), Number(req.query.numeroFranquicia), Boolean(req.query.exclusivo), String(req.query.caracteristicasEspeciales), Number(req.query.valorMercado), (error) => {});
            }
            
            res.send({
              respuesta: respuesta
            });
          }
        });
      }
    });
  }
});

app.get('*', (_, res) => {
  res.status(404).send();
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});