import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'; import { NivelService } from './niveles.service'; import { CrearNivelDto } from './dto/create-nivel.dto'; import { ActualizarNivelDto } from './dto/update-nivel.dto';

@Controller('nivel') export class NivelController { constructor(private readonly nivelService: NivelService) {}

@Post()
async create(@Body() crearNivelDto: CrearNivelDto) {
    return this.nivelService.create(crearNivelDto);
}

@Get()
async findAll() {
    return this.nivelService.findAll();
}

@Get(':id')
async findOne(@Param('id') id: string) {
    return this.nivelService.findOne(Number(id));
}

@Put(':id')
async update(@Param('id') id: string, @Body() actualizarNivelDto: ActualizarNivelDto) {
    return this.nivelService.update(Number(id), actualizarNivelDto);
}

@Delete(':id')
async remove(@Param('id') id: string) {
    return this.nivelService.remove(Number(id));
}
}