import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

describe('UsuariosService', () => {
  let servicio: UsuariosService;

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [UsuariosService],
    }).compile();

    servicio = modulo.get<UsuariosService>(UsuariosService);
  });

  it('se instancia correctamente', () => {
    expect(servicio).toBeDefined();
  });

  it('genera identificadores únicos aunque se eliminen registros', () => {
    const primero = servicio.create({ nombre: 'Gina', edad: 25 });
    const segundo = servicio.create({ nombre: 'Leonel', edad: 30 });

    servicio.remove(primero.id);
    expect(servicio.findOne(segundo.id)).toBe(segundo);

    const tercero = servicio.create({ nombre: 'Eva', edad: 20 });
    expect(tercero.id).toBeGreaterThan(segundo.id);
    expect(servicio.findAll()).toEqual([segundo, tercero]);
  });

  it('reemplaza el registro completo y permite cambios parciales', () => {
    const usuario = servicio.create({ nombre: 'Gina', edad: 25 });

    expect(servicio.update(usuario.id, { edad: 26 })).toEqual({
      id: usuario.id,
      nombre: 'Gina',
      edad: 26,
    });

    expect(servicio.replace(usuario.id, { nombre: 'Eva', edad: 20 })).toEqual({
      id: usuario.id,
      nombre: 'Eva',
      edad: 20,
    });
  });

  it('devuelve 404 cuando el identificador no existe', () => {
    expect(() => servicio.findOne(999)).toThrow(NotFoundException);
    expect(() => servicio.replace(999, { nombre: 'Eva', edad: 20 })).toThrow(
      NotFoundException,
    );
    expect(() => servicio.update(999, { edad: 20 })).toThrow(NotFoundException);
    expect(() => servicio.remove(999)).toThrow(NotFoundException);
  });
});
