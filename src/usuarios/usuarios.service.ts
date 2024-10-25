import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { updateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

    return this.prismaService.$transaction(async (prisma) => {

      const newUser = await prisma.usuario.create({ data: createUsuarioDto });

      await prisma.progreso.create({
        data: {
          categoriasProgreso: {},
          palabrasProgreso: {},
          porcentajeNivel: 0,
          idNivel: 1,
          idUsuario: newUser.idUsuario,
        }
      });
      
      return newUser;
    });
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
    const userFound = await this.prismaService.usuario.findUnique({
      where: {
        idUsuario: id,
      },
    });
    
    if (!userFound) {
      throw new NotFoundException(`El usuario con ${id} no fue encontrado`);
    }
    
    const userFoundDuplicated = await this.prismaService.usuario.findFirst({
      where: {
        AND: [
          {
            correoUsuario: {
              equals: updateUsuarioDto.correoUsuario,
              mode: 'insensitive',
            },
          },
          {
            idUsuario: {
              not: id,
            },
          },
        ],
      },
    })

    if (userFoundDuplicated) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Un usuario con ese correo ya existe.',
      }, HttpStatus.BAD_REQUEST);
    }

    return await this.prismaService.usuario.update({
      where: { idUsuario: id },
      data: updateUsuarioDto,
    });
  };

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
