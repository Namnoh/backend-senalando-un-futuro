import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePalabraDto } from './dto/create-palabra.dto';
import { UpdatePalabraDto } from './dto/update-palabra.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PalabrasService {
  constructor(private prismaService: PrismaService) {}

  // Crear una Palabra
  async create(createPalabraDto: CreatePalabraDto) {
    const wordFound = await this.prismaService.palabra.findFirst({
      where: {
        nombrePalabra: {
          equals: createPalabraDto.nombrePalabra,
          mode: 'insensitive',
        },
      }
    })

    if (wordFound) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Una palabra con ese nombre ya existe.',
      }, HttpStatus.BAD_REQUEST);
    }

    return this.prismaService.palabra.create({data: createPalabraDto});
  }

  // Buscar todas las Palabras
  findAll() {
    return this.prismaService.palabra.findMany();
  }

  // Buscar una Palabra en específico
  async findOne(id: number) {
    const wordFound = await this.prismaService.palabra.findUnique({
      where: {
        idPalabra: id
      }
    })

    // Si no se encontró la palabra, lanzar un mensaje de error
    if (!wordFound) {
      throw new NotFoundException(`La palabra de id ${id} no fue encontrada.`)
    }

    // De lo contrario, devolver la palabra
    return wordFound;
  }

  // Actualizar una Palabra
  async update(id: number, updatePalabraDto: UpdatePalabraDto) {
    const wordFoundDuplicated = await this.prismaService.palabra.findFirst({
      where: {
        AND: [
          {
            nombrePalabra: {
              equals: updatePalabraDto.nombrePalabra,
              mode: 'insensitive',
            },
          },
          {
            idPalabra: {
              not: id,
            },
          },
        ], 
      }
    })

    if (wordFoundDuplicated) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Una palabra con ese nombre ya existe.',
      }, HttpStatus.BAD_REQUEST);
    }

    const wordFound = await this.prismaService.palabra.update({
      where: {
        idPalabra : id
      },
      data: updatePalabraDto
    })

    if (!wordFound) {
      throw new NotFoundException(`La palabra con id: ${id} no fue encontrada.`);
    }

    return wordFound;
  }

  // Eliminar una Palabra
  async remove(id: number) {
    const deletedPalabra = await this.prismaService.palabra.delete({
      where: {
        idPalabra: id
      }
    })

    if (!deletedPalabra) {
      throw new NotFoundException(`La palabra con id: ${id} no fue encontrada.`);
    }

    return deletedPalabra;
  }

  async findAllByCategory(idCategoria: number) {
    const wordsFound = await this.prismaService.palabra.findMany({
      where: {
        idCategoria: idCategoria,  // Aquí se filtra por la FK que hace referencia al nivel
      },
    });

    if (!wordsFound) {
      throw new NotFoundException(
        `No se encontraron categorías correspondientes al nivel ${idCategoria}.`,
      );
    }

    return wordsFound;
  }

  async findAllByLevel(idNivel: number) {
    const wordsFound = await this.prismaService.palabra.findMany({
      where: {
        idNivel: idNivel,  // Aquí se filtra por la FK que hace referencia al nivel
      },
    });

    if (!wordsFound) {
      throw new NotFoundException(
        `No se encontraron categorías correspondientes al nivel ${idNivel}.`,
      );
    }

    return wordsFound;
  }
}
