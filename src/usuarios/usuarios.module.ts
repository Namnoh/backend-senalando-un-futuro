import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'xjCorXZS86ycrGYUFAJaDeHQ0znXHjW6', // Usa un secreto adecuado
      signOptions: { expiresIn: '60s' }, // Opciones para el token
    }),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService],
})
export class UsuariosModule {}
