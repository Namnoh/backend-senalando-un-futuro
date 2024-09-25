import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePalabraDto } from './dto/create-palabra.dto';
import { UpdatePalabraDto } from './dto/update-palabra.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PalabrasService {
  constructor(private prismaService: PrismaService) {}

  // Crear una Palabra
  create(createPalabraDto: CreatePalabraDto) {
    return this.prismaService.palabra.create({data: createPalabraDto});
  }

  // Buscar todas las Palabras
  findAll() {
    return this.prismaService.palabra.findMany();
  }

  // Buscar una Palabra en específico
  async findOne(id: number) {
    const palabraFound = await this.prismaService.palabra.findUnique({
      where: {
        id_palabra: id
      }
    })

    // Si no se encontró la palabra, lanzar un mensaje de error
    if (!palabraFound) {
      throw new NotFoundException(`La palabra de id ${id} no fue encontrada.`)
    }

    // De lo contrario, devolver la palabra
    return palabraFound;
  }

  // Actualizar una Palabra
  async update(id: number, updatePalabraDto: UpdatePalabraDto) {
    const palabraFound = await this.prismaService.palabra.update({
      where: {
        id_palabra : id
      },
      data: updatePalabraDto
    })

    if (!palabraFound) {
      throw new NotFoundException(`La palabra con id: ${id} no fue encontrada.`);
    }

    return palabraFound;
  }

  // Eliminar una Palabra
  async remove(id: number) {
    const deletedPalabra = await this.prismaService.palabra.delete({
      where: {
        id_palabra: id
      }
    })

    if (!deletedPalabra) {
      throw new NotFoundException(`La palabra con id: ${id} no fue encontrada.`);
    }

    return deletedPalabra;
  }
}
