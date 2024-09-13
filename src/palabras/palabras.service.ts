import { Injectable } from '@nestjs/common';
import { CreatePalabraDto } from './dto/create-palabra.dto';
import { UpdatePalabraDto } from './dto/update-palabra.dto';

@Injectable()
export class PalabrasService {
  create(createPalabraDto: CreatePalabraDto) {
    return 'This action adds a new palabra';
  }

  findAll() {
    return `This action returns all palabras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} palabra`;
  }

  update(id: number, updatePalabraDto: UpdatePalabraDto) {
    return `This action updates a #${id} palabra`;
  }

  remove(id: number) {
    return `This action removes a #${id} palabra`;
  }
}
