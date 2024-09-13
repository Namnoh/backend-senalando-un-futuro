import { Module } from '@nestjs/common';
import { PalabrasModule } from './palabras/palabras.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PalabrasModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
