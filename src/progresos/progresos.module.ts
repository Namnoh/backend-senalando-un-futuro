// src/progreso/progreso.module.ts
import { Module } from '@nestjs/common';
import { ProgresoController } from './progresos.controller';
import { ProgresoService } from './progresos.service';
import { PrismaService } from 'src/prisma/prisma.service'; // Ajusta la ruta

@Module({
    controllers: [ProgresoController],
    providers: [ProgresoService, PrismaService],
})
export class ProgresoModule {}