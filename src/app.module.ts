import { Module } from '@nestjs/common';
import { PalabrasModule } from './palabras/palabras.module';

@Module({
  imports: [PalabrasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
