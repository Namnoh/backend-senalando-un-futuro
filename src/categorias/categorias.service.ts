import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriasService {
  constructor(private prismaService: PrismaService) {}

  create(createCategoriaDto: CreateCategoriaDto) {
    return this.prismaService.categoria.create({data: createCategoriaDto});
  }

  findAll() {
    return this.prismaService.categoria.findMany();
  }
  

  async findOne(id: number) {
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
    const categoriaFound = await this.prismaService.categoria.update({
      where: {
        idCategoria : id
      },
      data: updateCategoriaDto
    })

    if (!categoriaFound) {
      throw new NotFoundException(`La categoría con id: ${id} no fue encontrada.`);
    }

    return categoriaFound;
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
    const categoriaFound = await this.prismaService.categoria.findMany({
      where: {
        idNivel: idNivel,  // Aquí se filtra por la FK que hace referencia al nivel
      },
    });

    if (!categoriaFound) {
      throw new NotFoundException(
        `No se encontraron categorías correspondientes al nivel ${idNivel}.`,
      );
    }

    return categoriaFound;
  }
}
