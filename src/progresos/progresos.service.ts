import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrearProgresoDto } from './dto/create-progreso.dto';
import { ActualizarProgresoDto } from './dto/update-progreso.dto';
import { Prisma, Progreso } from '@prisma/client';

@Injectable()
export class ProgresoService {
    constructor(private readonly prisma: PrismaService) {}

    async crearProgreso(crearProgresoDto: CrearProgresoDto): Promise<Progreso> {
        try {
            const usuarioExistente = await this.prisma.usuario.findUnique({
                where: { idUsuario: crearProgresoDto.idUsuario },
            });

            if (!usuarioExistente) {
                throw new NotFoundException(`Usuario con id ${crearProgresoDto.idUsuario} no encontrado`);
            }

            return await this.prisma.progreso.create({
                data: {
                    categoriasProgreso: crearProgresoDto.categoriasProgreso as any,
                    palabrasProgreso: crearProgresoDto.palabrasProgreso as any,
                    porcentajeNivel: crearProgresoDto.porcentajeNivel,
                    idNivel: crearProgresoDto.idNivel,
                    idUsuario: crearProgresoDto.idUsuario,
                },
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Error al crear el progreso: ${error.message}`);
        }
    }

    async obtenerProgresoPorUsuario(idUsuario: number): Promise<Progreso> {
        try {
            const progreso = await this.prisma.progreso.findUnique({
                where: { idUsuario },
            });

            if (!progreso) {
                throw new NotFoundException(`No se encontró progreso para el usuario con id ${idUsuario}`);
            }
            return progreso;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Error al obtener el progreso del usuario: ${error.message}`);
        }
    }

    async obtenerTodosLosProgresos(): Promise<Progreso[]> {
        try {
            return await this.prisma.progreso.findMany();
        } catch (error) {
            throw new InternalServerErrorException(`Error al obtener todos los progresos: ${error.message}`);
        }
    }

    async actualizarProgreso(idUsuario: number, datosActualizacion: Partial<ActualizarProgresoDto>): Promise<Progreso> {
        try {
            console.log('ENTRA EN EL BACKEND')
            console.log('IDUSUARIO: ', idUsuario)
            console.log('DATOSACTUALIZACIÓN: ', datosActualizacion)
            const progresoExistente = await this.prisma.progreso.findUnique({
                where: { idUsuario: idUsuario },
            });
            
            console.log('Progreso Existente:', progresoExistente)
            if (!progresoExistente) {
                throw new NotFoundException(`No se encontró progreso para el usuario con id ${idUsuario}`);
            }
    
            const datosActualizacionFormateados = {
                ...datosActualizacion,
                categoriasProgreso: datosActualizacion.categoriasProgreso as Prisma.JsonValue,
                palabrasProgreso: datosActualizacion.palabrasProgreso as Prisma.JsonValue,
            };

            return await this.prisma.progreso.update({
                where: { idUsuario },
                data: datosActualizacionFormateados,
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Manejar errores específicos de Prisma
                throw new InternalServerErrorException(`Error de base de datos: ${error.message}`);
            }
            throw new InternalServerErrorException(`Error al actualizar el progreso: ${error.message}`);
        }
    }

    async update(idProgreso: number, updatedProgress: ActualizarProgresoDto) {
        const progressFound = await this.prisma.progreso.findUnique({
            where: {
                idProgreso: idProgreso,
            },
        });
            
        if (!progressFound) {
            throw new NotFoundException(`El usuario con ${idProgreso} no fue encontrado`);
        }

        const datosActualizacionFormateados = {
            ...updatedProgress,
            categoriasProgreso: JSON.stringify(updatedProgress.categoriasProgreso),
            palabrasProgreso: JSON.stringify(updatedProgress.palabrasProgreso),
        };

        return await this.prisma.progreso.update({
            where: { idProgreso: idProgreso },
            data: datosActualizacionFormateados,
        });
    };
}