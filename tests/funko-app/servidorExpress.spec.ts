import 'mocha'
import { expect } from "chai";
import request from 'request';

describe('Pruebas para Servidor Express', () => {
  it('Test de añadir', () => {
    const url = `http://localhost:3000/funkos?user=test&ID=1&nombre=Ivan Funko&descripcion=Funko Pop de Ivan&tipo=Pop!&genero=Animacion&franquicia=ULL&numeroFranquicia=1&exclusivo=true&caracteristicasEspeciales=Estudiar&valorMercado=28.57`;

    request.post({url: url, json: true, }, (error: Error, response) => {
      expect(response.body).to.be.eql({respuesta: {
          type: 'add',
          success: true,
        }
      });
    });
  })
})


describe('Pruebas para Servidor Express', () => {
  it('Test de modificar', () => {
    const url = `http://localhost:3000/funkos?user=test&ID=1&nombre=Pepe Funko&descripcion=Funko Pop de Ivan&tipo=Pop!&genero=Animacion&franquicia=ULL&numeroFranquicia=1&exclusivo=true&caracteristicasEspeciales=Estudiar&valorMercado=28.57`;

    request.patch({url: url, json: true, }, (error: Error, response) => {
      expect(response.body).to.be.eql({respuesta: {
          type: 'update',
          success: true,
        }
      });
    });
  })
})


describe('Pruebas para Servidor Express', () => {
  it('Test de mostrar', () => {
    const url = `http://localhost:3000/funkos?user=test&ID=1`;

    request.get({url: url, json: true, }, (error: Error, response) => {
      expect(response.body).to.be.eql({respuesta: {
        "type": "show",
        "success": true,
        "funkoPops": [{
          "ID": 1,
          "nombre": "Pepe Funko",
          "descripcion": "Funko Pop de Ivan",
          "tipo": "Pop!",
          "genero": "Animacion",
          "franquicia": "ULL",
          "numeroFranquicia": 1,
          "exclusivo": true,
          "caracteristicasEspeciales": "Estudiar",
          "valorMercado": 28.57
        }]
        }
      });
    });
  })
})


describe('Pruebas para Servidor Express', () => {
  it('Test de Listar', () => {
    const url = `http://localhost:3000/funkos?user=test`;

    request.get({url: url, json: true, }, (error: Error, response) => {
      expect(response.body).to.be.eql({respuesta: {
        "type": "list",
        "success": true,
        "funkoPops": [{
          "ID": 1,
          "nombre": "Pepe Funko",
          "descripcion": "Funko Pop de Ivan",
          "tipo": "Pop!",
          "genero": "Animacion",
          "franquicia": "ULL",
          "numeroFranquicia": 1,
          "exclusivo": true,
          "caracteristicasEspeciales": "Estudiar",
          "valorMercado": 28.57
        }]
        }
      });
    });
  })
})


describe('Pruebas para Servidor Express', () => {
  it('Test de eliminar', () => {
    const url = `http://localhost:3000/funkos?user=test&ID=1`;

    request.delete({url: url, json: true, }, (error: Error, response) => {
      expect(response.body).to.be.eql({respuesta: {
          type: 'remove',
          success: true,
        }
      });
    });
  })
})