import 'mocha'
import { expect } from "chai";
import { holaMundo } from "../src/index";

describe('Pruebas para holaMundo', () => {
  it('Test', () => {
    expect(holaMundo('Hola Mundo')).to.be.eql('Hola Mundo');
  })
})