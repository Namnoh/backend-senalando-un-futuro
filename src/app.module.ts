import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  // Importar ConfigModule
import { PalabrasModule } from './palabras/palabras.module';
import { PrismaService } from './prisma/prisma.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Hace que las variables de entorno estén disponibles globalmente en toda la aplicación
    }),
    PalabrasModule, 
    UsuariosModule, CategoriasModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
