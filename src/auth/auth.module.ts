import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService,UsuariosService],
})
export class AuthModule {}
