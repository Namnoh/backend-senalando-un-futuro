import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuariosService {

  constructor(private prismaService: PrismaService){}

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.prismaService.usuario.create({data: createUsuarioDto})
  }

  findAll() {
    return this.prismaService.usuario.findMany()
  }

  findOne(id: number) {
    return this.prismaService.usuario.findUnique({
      where:{
        idUsuario: id
      }
    })
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
