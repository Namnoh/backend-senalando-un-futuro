import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriasService {
  constructor(private prismaService: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoriaFound = await this.prismaService.categoria.findFirst({
      where: {
        nombreCategoria: {
          equals: createCategoriaDto.nombreCategoria,
          mode: 'insensitive',
        },
      }
    })

    if (categoriaFound) {
      // Si la categoría ya existe, lanza una excepción con un mensaje y código HTTP
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Una categoría con ese nombre ya existe.',
      }, HttpStatus.BAD_REQUEST);
    }

    return this.prismaService.categoria.create({data: createCategoriaDto});
  }

  findAll() {
    return this.prismaService.categoria.findMany();
  }
  

  async findOne(id: number) {
    // FIND UNIQUE BUSCA POR MEDIO DE LOS ATRIBUTOS QUE SON UNIQUE
    const categoriaFound = await this.prismaService.categoria.findUnique({
      where: {
        idCategoria: id
      }
    })

    if (!categoriaFound) {
      throw new NotFoundException(`La categoría de id ${id} no fue encontrada.`)
    }

    return categoriaFound;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoryFoundDuplicated = await this.prismaService.categoria.findFirst({
      where: {
        nombreCategoria: {
          equals: updateCategoriaDto.nombreCategoria,
          mode: 'insensitive',
        },
      }
    })

    if (categoryFoundDuplicated) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Una categoría con ese nombre ya existe.',
      }, HttpStatus.BAD_REQUEST);
    }

    const categoryFound = await this.prismaService.categoria.update({
      where: {
        idCategoria : id
      },
      data: updateCategoriaDto
    })

    if (!categoryFound) {
      throw new NotFoundException(`La categoría con id: ${id} no fue encontrada.`);
    }

    return categoryFound;
  }

  async remove(id: number) {
    const deletedCategoria = await this.prismaService.categoria.delete({
      where: {
        idCategoria: id
      }
    })

    if (!deletedCategoria) {
      throw new NotFoundException(`La palabra con id: ${id} no fue encontrada.`);
    }
    
    return deletedCategoria;
  }

  async findAllByLevel(idNivel: number) {
    const categoryFound = await this.prismaService.categoria.findMany({
      where: {
        idNivel: idNivel,  // Aquí se filtra por la FK que hace referencia al nivel
      },
    });

    if (!categoryFound) {
      throw new NotFoundException(
        `No se encontraron categorías correspondientes al nivel ${idNivel}.`,
      );
    }

    return categoryFound;
  }
}
