import {
  Body,
  Controller,
  Delete,
  Get,
  Head,
  Header,
  HttpCode,
  Options,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly servicio: UsuariosService) {}

  @Options()
  @HttpCode(204)
  @Header('Allow', 'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS')
  optionsColeccion(): void {}

  @Options(':id')
  @HttpCode(204)
  @Header('Allow', 'GET, HEAD, PUT, PATCH, DELETE, OPTIONS')
  optionsRegistro(): void {}

  @Post()
  crear(@Body() datos: CreateUsuarioDto) {
    return this.servicio.create(datos);
  }

  @Get()
  listar() {
    return this.servicio.findAll();
  }

  @Get(':id')
  consultar(@Param('id', ParseIntPipe) id: number) {
    return this.servicio.findOne(id);
  }

  @Head()
  @HttpCode(200)
  headColeccion(@Res({ passthrough: true }) respuesta: Response): void {
    respuesta.setHeader('X-Total-Usuarios', String(this.servicio.count()));
    respuesta.setHeader('X-API-Estado', 'Funcionando');
  }

  @Head(':id')
  headRegistro(@Param('id', ParseIntPipe) id: number): void {
    this.servicio.findOne(id);
  }

  @Put(':id')
  reemplazar(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: CreateUsuarioDto,
  ) {
    return this.servicio.replace(id, datos);
  }

  @Patch(':id')
  modificar(
    @Param('id', ParseIntPipe) id: number,
    @Body() cambios: UpdateUsuarioDto,
  ) {
    return this.servicio.update(id, cambios);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.servicio.remove(id);
  }
}
