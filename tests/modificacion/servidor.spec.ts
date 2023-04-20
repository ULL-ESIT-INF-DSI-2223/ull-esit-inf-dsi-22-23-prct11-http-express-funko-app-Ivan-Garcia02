import 'mocha'
import { expect } from "chai";
import request from 'request';

describe('Pruebas para servidor', () => {
  it('Test de ejecucion correcta', () => {
    const url = `http://localhost:3000/execmd?cmd=ls&args=src`;

    request.get({url: url, json: true, }, (error: Error, response) => {
      expect(response.body).to.be.eql({
        "output": "funko-app\nmodificacion\n"
      });
    });
  });


  it('Test de ejecucion comando incorrecto', () => {
    const url = `http://localhost:3000/execmd?cmd=pi`;

    request.get({url: url, json: true, }, (error: Error, response) => {
      expect(response.statusCode).to.be.eql(500);
      expect(response.body).to.be.eql({
        "error": {
          "code": 127,
          "killed": false,
          "signal": null,
          "cmd": "pi"
        },
        "errorText": "/bin/sh: 1: pi: not found\n"
      });
    });
  });


  it('Test de ejecucion sin comando', () => {
    const url = `http://localhost:3000/execmd`;

    request.get({url: url, json: true, }, (error: Error, response) => {
      expect(response.statusCode).to.be.eql(400);
    });
  });


  it('Test de ejecucion sin ruta', () => {
    const url = `http://localhost:3000`;

    request.get({url: url, json: true, }, (error: Error, response) => {
      expect(response.statusCode).to.be.eql(404);
    });
  });
});