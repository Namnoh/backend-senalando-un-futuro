import { Module } from '@nestjs/common';
import { PalabrasService } from './palabras.service';
import { PalabrasController } from './palabras.controller';

@Module({
  controllers: [PalabrasController],
  providers: [PalabrasService],
})
export class PalabrasModule {}
