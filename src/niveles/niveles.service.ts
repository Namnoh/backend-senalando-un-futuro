import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'; import { PrismaService } from '../prisma/prisma.service'; import { CrearNivelDto } from './dto/create-nivel.dto'; import { ActualizarNivelDto } from './dto/update-nivel.dto';

@Injectable() export class NivelService { constructor(private prisma: PrismaService) {}

    // Crear un nivel
    async create(crearNivelDto: CrearNivelDto) {
        return this.prisma.nivel.create({
        data: crearNivelDto,
        });
    }

    // Obtener todos los niveles
    async findAll() {
        return this.prisma.nivel.findMany();
    }

    // Obtener un nivel por su ID
    async findOne(id: number) {
        const nivel = await this.prisma.nivel.findUnique({
        where: { idNivel: id },
        });
        if(!nivel){
            throw new NotFoundException("no se encontro nivel")
        }
        return nivel
    }


    // Actualizar un nivel
    async update(id: number, actualizarNivelDto: ActualizarNivelDto) {
        return this.prisma.nivel.update({
        where: { idNivel: id },
        data: actualizarNivelDto,
        });
    }

    // Eliminar un nivel
    async remove(id: number) {
        try {
            return this.prisma.nivel.delete({
                where: { idNivel: id },
                });
        } catch (error) {
            if (error.code === 'P2011') {
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        message: "No se puede eliminar este nivel porque está relacionada con otros registros.",
                    },
                    HttpStatus.BAD_REQUEST
                    );
            }
            throw new HttpException(
                {
                status: HttpStatus.BAD_REQUEST,
                message: 'Ha ocurrido un error al intentar eliminar el nivel.',
                },
                HttpStatus.BAD_REQUEST
            );
        }
    }
}