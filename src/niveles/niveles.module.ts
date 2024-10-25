// src/nivel/nivel.module.ts
import { Module } from '@nestjs/common';
import { NivelService } from './niveles.service';
import { NivelController } from './nivel.controller';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de tener PrismaService

@Module({
    controllers: [NivelController],
    providers: [NivelService, PrismaService],
})
export class NivelModule {}