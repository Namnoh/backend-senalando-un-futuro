// src/progreso/progreso.module.ts
import { Module } from '@nestjs/common';
import { ProgresoController } from './progresos.controller';
import { ProgresoService } from './progresos.service';
import { PrismaService } from 'src/prisma/prisma.service'; // Ajusta la ruta
import { PalabrasService } from 'src/palabras/palabras.service';

@Module({
    controllers: [ProgresoController],
    providers: [ProgresoService, PrismaService, PalabrasService],
})
export class ProgresoModule {}