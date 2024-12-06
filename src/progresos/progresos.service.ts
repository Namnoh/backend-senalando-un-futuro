import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrearProgresoDto } from './dto/create-progreso.dto';
import { ActualizarProgresoDto, CategoriaProgreso, PalabraProgreso } from './dto/update-progreso.dto';
import { Prisma, Progreso } from '@prisma/client';
import { PalabrasService } from 'src/palabras/palabras.service';

@Injectable()
export class ProgresoService {
    constructor(private readonly prisma: PrismaService, private readonly palabrasService: PalabrasService) {}

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

            let updatedProgress: Progreso;

            const originalCategoriasProgreso:CategoriaProgreso[] = Object.values(progreso.categoriasProgreso);
            let wasUpdated = false; 
            const categoriaPromises = Object.values(originalCategoriasProgreso).map(async (category: CategoriaProgreso) => {
                // Usamos await aquí porque map es asincrónico
                const categoryWordsTotal = await this.palabrasService.findAllByCategory(category.idCategoria);
                
                if (Object.keys(progreso.categoriasProgreso).length === 0) {
                    // Si no encontramos palabras para esta categoría, devolver un objeto vacío o manejar el error
                    return {};
                }

                // Se cuentan las palabras totales del progreso actual
                const wordsCount = Object.values(progreso.palabrasProgreso).filter(
                (palabra) => palabra.categoriaPalabra === category.idCategoria
                ).length;
        
                // Se hace el cálculo para el total
                const porcentajeCategoria = wordsCount / categoryWordsTotal.length;
                if (porcentajeCategoria === category.progresoCategoria) {
                    return {
                        [category.idCategoria]: category
                    };
                }
                
                const categoriaProgreso : CategoriaProgreso = {
                    ...category,
                    progresoCategoria: porcentajeCategoria,
                };
                
                wasUpdated = true;
                return {
                    [category.idCategoria]: categoriaProgreso
                };
            })

            // Esperamos a que todas las promesas se resuelvan
            const categoriasProgresoArray = await Promise.all(categoriaPromises);

            // Aplanar el array para extraer los objetos dentro de las claves
            const aplanadoCategoriasProgreso = categoriasProgresoArray.flatMap((obj) => Object.values(obj));
            // Se crea el objeto con las categorías en progreso.
            const categoriasProgreso = aplanadoCategoriasProgreso.reduce(
                (acc, item: CategoriaProgreso) => {
                    acc[item.idCategoria] = item; // Usa `idCategoria` o cualquier propiedad única como clave
                    return acc;
                },
                {} as Record<string, CategoriaProgreso> // Asegúrate de que el acumulador es del tipo adecuado
            );
            
            updatedProgress = {
                ...progreso,
                categoriasProgreso: categoriasProgreso as any,
            };

            if (wasUpdated) {
                return this.actualizarProgreso(idUsuario, updatedProgress);
            };
            return updatedProgress;
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
            const progresoExistente = await this.prisma.progreso.findUnique({
                where: { idUsuario: idUsuario },
            });
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