import { Controller, Get, Post, Put, Body, Param, UseGuards, ParseIntPipe, Patch } from '@nestjs/common';
//import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs';
import { ProgresoService } from './progresos.service';
import { CrearProgresoDto } from './dto/create-progreso.dto';
import { ActualizarProgresoDto } from './dto/update-progreso.dto';
import { Progreso } from '@prisma/client';

@Controller('progreso')
export class ProgresoController {
    constructor(private readonly progresoService: ProgresoService) {}

    @Post()
    // @ApiOperation({ summary: 'Crear un nuevo progreso' })
    // @ApiResponse({ status: 201, description: 'El progreso ha sido creado exitosamente.' })
    // @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
    // @ApiBody({ type: CrearProgresoDto })
    async crearProgreso(@Body() crearProgresoDto: CrearProgresoDto): Promise<Progreso> {
        return this.progresoService.crearProgreso(crearProgresoDto);
    }

    @Get('usuario/:idUsuario')
    // @ApiOperation({ summary: 'Obtener el progreso de un usuario específico' })
    // @ApiResponse({ status: 200, description: 'Retorna el progreso del usuario.' })
    // @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    async obtenerProgresoPorUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number): Promise<Progreso> {
        return this.progresoService.obtenerProgresoPorUsuario(idUsuario);
    }

    @Get()
    // @ApiOperation({ summary: 'Obtener todos los progresos' })
    // @ApiResponse({ status: 200, description: 'Retorna la lista de todos los progresos.' })
    async obtenerTodosLosProgresos(): Promise<Progreso[]> {
        return this.progresoService.obtenerTodosLosProgresos();
    }

    @Put('usuario/:idUsuario')
    // @ApiOperation({ summary: 'Actualizar el progreso de un usuario' })
    // @ApiResponse({ status: 200, description: 'El progreso ha sido actualizado exitosamente.' })
    // @ApiResponse({ status: 404, description: 'Progreso no encontrado.' })
    // @ApiBody({ type: ActualizarProgresoDto })
    async actualizarProgreso(
        @Param('idUsuario', ParseIntPipe) idUsuario: number,
        @Body() datosActualizacion: ActualizarProgresoDto
    ): Promise<Progreso> {
        return this.progresoService.actualizarProgreso(idUsuario, datosActualizacion);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updatedProgress: ActualizarProgresoDto) {
        return this.progresoService.update(+id, updatedProgress);
    }
}