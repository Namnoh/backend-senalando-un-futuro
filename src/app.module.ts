import { Module } from '@nestjs/common';
import { PalabrasModule } from './palabras/palabras.module';
import { PrismaService } from './prisma/prisma.service';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [PalabrasModule, UsuariosModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
