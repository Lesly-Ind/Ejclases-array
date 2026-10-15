import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  private readonly registros: Usuario[] = [];
  private consecutivo = 1;

  create(datos: CreateUsuarioDto): Usuario {
    const nuevo = new Usuario(this.consecutivo++, datos.nombre, datos.edad);
    this.registros.push(nuevo);
    return nuevo;
  }

  findAll(): Usuario[] {
    return [...this.registros];
  }

  findOne(id: number): Usuario {
    const encontrado = this.registros.find((item) => item.id === id);
    if (!encontrado) {
      throw new NotFoundException(`No se encontró el usuario con identificador ${id}`);
    }
    return encontrado;
  }

  replace(id: number, datos: CreateUsuarioDto): Usuario {
    const posicion = this.registros.findIndex((item) => item.id === id);
    if (posicion < 0) {
      throw new NotFoundException(`No se encontró el usuario con identificador ${id}`);
    }

    const reemplazo = new Usuario(id, datos.nombre, datos.edad);
    this.registros[posicion] = reemplazo;
    return reemplazo;
  }

  update(id: number, cambios: UpdateUsuarioDto): Usuario {
    const actual = this.findOne(id);

    if (cambios.nombre !== undefined) actual.nombre = cambios.nombre;
    if (cambios.edad !== undefined) actual.edad = cambios.edad;

    return actual;
  }

  remove(id: number): Usuario {
    const posicion = this.registros.findIndex((item) => item.id === id);
    if (posicion < 0) {
      throw new NotFoundException(`No se encontró el usuario con identificador ${id}`);
    }

    const [eliminado] = this.registros.splice(posicion, 1);
    return eliminado;
  }

  count(): number {
    return this.registros.length;
  }
}
