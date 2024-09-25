import { Module } from '@nestjs/common';
import { PalabrasService } from './palabras.service';
import { PalabrasController } from './palabras.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PalabrasController],
  providers: [PalabrasService, PrismaService],
})
export class PalabrasModule {}
