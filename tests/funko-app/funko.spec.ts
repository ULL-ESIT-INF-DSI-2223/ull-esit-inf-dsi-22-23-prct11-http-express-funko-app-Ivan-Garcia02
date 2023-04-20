import 'mocha'
import { expect } from "chai";
import { Funko, TipoFunko, GeneroFunko, convertGeneroFunko, convertTipoFunko } from "../../src/funko-app/funko.js";

describe('Tests para la clase Funko', () => {
  it('Se puede crear un objeto de la clase Funko', () => {
    expect(new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 15.5)).not.to.be.undefined
  })

  it("Se puede acceder y modificar el atributo ID", () => {
    let funkoIronMan: Funko = new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 15.5);
    expect(funkoIronMan.ID).to.be.eql(1);
    expect(funkoIronMan.ID = 2).to.be.eql(2);
  })
  it("Se puede acceder y modificar el atributo nombre", () => {
    let funkoIronMan: Funko = new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 15.5);
    expect(funkoIronMan.nombre).to.be.eql("Iron Man");
    expect(funkoIronMan.nombre = "Capitan America").to.be.eql("Capitan America");
  })
  it("Se puede acceder y modificar el atributo descripcion", () => {
    let funkoIronMan: Funko = new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 15.5);
    expect(funkoIronMan.descripcion).to.be.eql("Funko Pop del superheroe IronMan");
    expect(funkoIronMan.descripcion = "Funko Pop del superheroe Capitan America").to.be.eql("Funko Pop del superheroe Capitan America");
  })
  it("Se puede acceder y modificar el atributo tipo", () => {
    let funkoIronMan: Funko = new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 15.5);
    expect(funkoIronMan.tipo).to.be.eql(TipoFunko.Pop);
    expect(funkoIronMan.tipo = TipoFunko.PopRides).to.be.eql(TipoFunko.PopRides);
  })
  it("Se puede acceder y modificar el atributo genero", () => {
    let funkoIronMan: Funko = new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 15.5);
    expect(funkoIronMan.genero).to.be.eql(GeneroFunko.Peliculas);
    expect(funkoIronMan.genero = GeneroFunko.Animacion).to.be.eql(GeneroFunko.Animacion);
  })
  it("Se puede acceder y modificar el atributo franquicia", () => {
    let funkoIronMan: Funko = new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 15.5);
    expect(funkoIronMan.franquicia).to.be.eql("Marvel");
    expect(funkoIronMan.franquicia = "Marvel Studios").to.be.eql("Marvel Studios");
  })
  it("Se puede acceder y modificar el atributo numeroFranquicia", () => {
    let funkoIronMan: Funko = new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 15.5);
    expect(funkoIronMan.numeroFranquicia).to.be.eql(1);
    expect(funkoIronMan.numeroFranquicia = 2).to.be.eql(2);
  })
  it("Se puede acceder y modificar el atributo exclusivo", () => {
    let funkoIronMan: Funko = new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 15.5);
    expect(funkoIronMan.exclusivo).to.be.false;
    expect(funkoIronMan.exclusivo = true).to.be.true;
  })
  it("Se puede acceder y modificar el atributo caracteristicasEspeciales", () => {
    let funkoIronMan: Funko = new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 15.5);
    expect(funkoIronMan.caracteristicasEspeciales).to.be.eql("");
    expect(funkoIronMan.caracteristicasEspeciales = "Luz").to.be.eql("Luz");
  })
  it("Se puede acceder y modificar el atributo valorMercado", () => {
    let funkoIronMan: Funko = new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 15.5);
    expect(funkoIronMan.valorMercado).to.be.eql(15.5);
    expect(funkoIronMan.valorMercado = 10.8).to.be.eql(10.8);
  })

  it("Se puede mostrar un funko", () => {
    let funkoIronMan1: Funko = new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 4.5);
    let funkoIronMan2: Funko = new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 10.5);
    let funkoIronMan3: Funko = new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 20.5);
    let funkoIronMan4: Funko = new Funko(1, "Iron Man", "Funko Pop del superheroe IronMan", TipoFunko.Pop, GeneroFunko.Peliculas, "Marvel", 1, false, "", 31);
    expect(funkoIronMan1.mostrarFunko()).to.be.undefined
    expect(funkoIronMan2.mostrarFunko()).to.be.undefined
    expect(funkoIronMan3.mostrarFunko()).to.be.undefined
    expect(funkoIronMan4.mostrarFunko()).to.be.undefined
  })
})

describe('Tests para los convertidores', () => {
  it('Tests para la función convertTipoFunko', () => {
    expect(convertTipoFunko('Pop!')).to.be.eql(TipoFunko.Pop);
    expect(convertTipoFunko('Pop! Rides')).to.be.eql(TipoFunko.PopRides);
    expect(convertTipoFunko('Vynil Soda')).to.be.eql(TipoFunko.VynilSoda);
    expect(convertTipoFunko('Vynil Gold')).to.be.eql(TipoFunko.VynilGold);
    expect(convertTipoFunko('Regular')).to.be.eql(TipoFunko.Regular);
  })

  it('Tests para la función convertGeneroFunko', () => {
    expect(convertGeneroFunko('Animacion')).to.be.eql(GeneroFunko.Animacion);
    expect(convertGeneroFunko('Peliculas')).to.be.eql(GeneroFunko.Peliculas);
    expect(convertGeneroFunko('TV')).to.be.eql(GeneroFunko.TV);
    expect(convertGeneroFunko('Videojuegos')).to.be.eql(GeneroFunko.Videojuegos);
    expect(convertGeneroFunko('Deportes')).to.be.eql(GeneroFunko.Deportes);
    expect(convertGeneroFunko('Musica')).to.be.eql(GeneroFunko.Musica);
    expect(convertGeneroFunko('Anime')).to.be.eql(GeneroFunko.Anime);
    expect(convertGeneroFunko('General')).to.be.eql(GeneroFunko.General);
  })
})

