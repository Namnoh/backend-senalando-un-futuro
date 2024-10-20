import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { updateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(private prismaService: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const userFound = await this.prismaService.usuario.findFirst({
      where: {
        correoUsuario: {
          equals: createUsuarioDto.correoUsuario,
          mode: 'insensitive',
        },
      }
    })

    if (userFound) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Un usuario con ese nombre ya existe.',
      }, HttpStatus.BAD_REQUEST);
    }

    return this.prismaService.usuario.create({ data: createUsuarioDto });
  }

  findAll() {
    return this.prismaService.usuario.findMany();
  }

  async authorize(email: string) {
    const userFound = await this.prismaService.usuario.findUnique({
      where: {
        correoUsuario: email
      },
    });
    if (!userFound) {
      throw new NotFoundException(`El usuario con ${email} no fue encontrado`);
    }
    return userFound;
  }


  async findOne(id: number) {
    const userFound = await this.prismaService.usuario.findUnique({
      where: {
        idUsuario: id,
      },
    });
    if (!userFound) {
      throw new NotFoundException(`El usuario con ${id} no fue encontrado`);
    }
    return userFound;
  }

  async update(id: number, updateUsuarioDto: updateUsuarioDto) {
    const userFoundDuplicated = await this.prismaService.usuario.findFirst({
      where: {
        correoUsuario: {
          equals: updateUsuarioDto.correoUsuario,
          mode: 'insensitive',
        },
      }
    })

    if (userFoundDuplicated) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Un usuario con ese correo ya existe.',
      }, HttpStatus.BAD_REQUEST);
    }

    const userFound = await this.prismaService.usuario.update({
      where: {
        idUsuario: id,
      },
      data: updateUsuarioDto,
    });
    if (!userFound) {
      throw new NotFoundException(`El usuario con ${id} no fue encontrado`);
    }
  }

  async remove(id: number) {
    const deleteUsuario = await this.prismaService.usuario.delete({
      where: {
        idUsuario: id,
      },
    });
    if (!deleteUsuario) {
      throw new NotFoundException(`El usuario con ${id} no fue encontrado`);
    }
    return deleteUsuario;
  }
  
  async findByEmail(correo: string) {
    return this.prismaService.usuario.findUnique({
      where: { correoUsuario: correo },
      select: {
        contrasenaUsuario: true,
        nombreUsuario: true,
        idUsuario: true,
        correoUsuario: true

      },
    });
  }
  
}
