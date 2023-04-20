import 'mocha'
import { expect } from "chai";
import { getFunkos, existeID } from "../../src/funko-app/funkoFiles.js";
import { Funko, TipoFunko, GeneroFunko } from '../../src/funko-app/funko.js';

describe('Pruebas para callback asincronos de la funko-app', () => {
  it('Prueba de getFunkos', (done) => {
    getFunkos('pepe', (_, data) => {
      if (data) {
        expect(data[0].ID).to.be.equal(1);
        done();
      }
    });
  });


  it('Prueba de existeID', (done) => {
    let coleccion: Funko[] = [new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 15.5)];
    console.log(coleccion[0].mostrarFunko())
    existeID(coleccion, 1, (_, data) => {
      if (data) {
        expect(data).to.be.equal(0);
        done();
      }
    });
  });
});