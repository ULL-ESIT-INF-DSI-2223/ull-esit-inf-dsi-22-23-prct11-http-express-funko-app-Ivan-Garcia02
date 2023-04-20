import { readFile, readdir, access, writeFile, mkdir, constants } from 'fs';
import { TipoFunko, GeneroFunko, Funko} from "./funko.js";

/**
 * Callback para leer los ficheros de funkos de un usuario e inicializar un array de funkos
 * @param user Usuario de la aplicacion
 * @param cb Callback para guardar la coleccion de funkos
 */
export const getFunkos = (user: string, cb: (err: string | undefined, res: Funko[] | undefined) => void) => {
  const response: Funko[] = [];

  access(('./data/' + user), constants.F_OK, (err) => {
    if (!err) {
      readdir('./data/' + user, (erro, files) => {
        if (!erro) {
          let fileCount = files.length; // Inicializar el contador de archivos
          if (fileCount === 0) { // Si no hay archivos
            cb(undefined, response);
          }
          
          files.forEach(funkoFile => {
            readFile('./data/' + user + '/' + funkoFile, (error, data) => {
              if (!error) {
                let dataJson =  JSON.parse(data.toString());
                let funko: Funko = new Funko (dataJson.ID, dataJson.nombre, dataJson.descripcion, dataJson.tipo, dataJson.genero, dataJson.franquicia, dataJson.numeroFranquicia, dataJson.exclusivo, dataJson.caractericticasEspeciales, dataJson.valorMercado);
                response.push(funko);

                fileCount--; // Reducir el contador de archivos pendientes
                if (fileCount === 0) { // Si no quedan archivos pendientes, emitir el evento
                  cb(undefined, response);
                }
              }
            });
          });
        }
      });
    }
    else {
      cb(undefined, response);
    }
  });
};

/**
 * Callback para saber si existe un ID y para saber su índice
 * @param funkoPops Coleccion de funkos a buscar el ID
 * @param ID Identificador único del Funko
 * @param cb Callback que contendra la salida correspondiente a un error y el indice
 */
export const existeID = (funkoPops: Funko[], ID: number | undefined, cb: (err: string | undefined, res: number) => void) => {
  let indexFound: number = -1;

  if (ID !== undefined) {
    funkoPops.forEach((funko, index) => {
      if (funko.ID === ID) {
        indexFound = index
      }
    })
  }

  cb(undefined, indexFound);
}

/**
 * Callback encargada de cargar un Funko a un fichero JSON
 * @param ID Identificador único del Funko
 * @param nombre Nombre del Funko
 * @param descripcion Descripcion del Funko
 * @param tipo Tipo, Pop!, Pop! Rides, Vynil Soda o Vynil Gold, entre otros
 * @param genero Genero, Animación, Películas y TV, Videojuegos, Deportes, Música o Ánime, entre otras
 * @param franquicia Franquicia, The Big Bang Theory, Game of Thrones, Sonic The Hedgehog o Marvel: Guardians of the Galaxy, entre otras.
 * @param numeroFranquicia Número identificativo del Funko dentro de la franquicia correspondiente
 * @param exclusivo Verdadero en el caso de que el Funko sea exclusivo o falso en caso contrario
 * @param caracteristicasEspeciales Característica especiales del Funko como, por ejemplo, si brilla en la oscuridad o si su cabeza balancea
 * @param valorMercado Precio del Funko 
 * @param cb Callback que retornara si hubo error
 */
export const writeFunkoFile = (usuario: string, ID: number, nombre: string, descripcion: string, tipo: TipoFunko, genero: GeneroFunko, franquicia: string, numeroFranquicia: number, exclusivo: boolean, caracteristicasEspeciales: string, valorMercado: number, cb: (err: string | undefined) => void) => {
  let funkoToSave = {ID: ID, nombre: nombre, descripcion: descripcion, tipo: tipo, genero: genero, franquicia: franquicia, numeroFranquicia: numeroFranquicia, exclusivo: exclusivo, caractericticasEspeciales: caracteristicasEspeciales, valorMercado: valorMercado};

  access(('./data/' + usuario), constants.F_OK, (err) => {
    if (err) {
      mkdir('./data/' + usuario, (err) => {
        if (err) {
          cb(`Error al crear el usuario: ${err}`);
        }
        else {
          console.log('Directory created successfully!');
        }
      });
    }

    writeFile('./data/' + usuario + '/' + ID + '.json', JSON.stringify(funkoToSave, null, 2), (error) => {
      if (error) {
        cb(`Error al guardar el funko: ${error}`);
      }
      else {
        cb(undefined);
      }
    });
  });
}