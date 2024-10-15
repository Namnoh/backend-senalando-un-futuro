import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { updateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {

  constructor(private prismaService: PrismaService){}

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.prismaService.usuario.create({data: createUsuarioDto})
  }

  findAll() {
    return this.prismaService.usuario.findMany()
  }

  async findOne(id: number) {
    const usuarioFound =  await this.prismaService.usuario.findUnique({
      where:{
        idUsuario: id
      },
    });
    if (!usuarioFound) {
      throw new NotFoundException(`El usuario con ${id} no fue encontrado`)
    }
    return usuarioFound;
  }

  async update(id: number, updateUsuarioDto: updateUsuarioDto) {
    const usuarioFound = await this.prismaService.usuario.update({
      where:{
        idUsuario: id
      },
      data: updateUsuarioDto
    })
    if (!usuarioFound) {
      throw new NotFoundException(`El usuario con ${id} no fue encontrado`)
    }
  }

  async remove(id: number) {
    const deleteUsuario = await this.prismaService.usuario.delete({
      where:{
        idUsuario: id
      }
    })
    if (!deleteUsuario) {
      throw new NotFoundException(`El usuario con ${id} no fue encontrado`)
    }
    return deleteUsuario;
  }
}
