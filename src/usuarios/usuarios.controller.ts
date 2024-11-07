import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  HttpCode,
  UnauthorizedException,
  ForbiddenException,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { updateUsuarioDto } from './dto/update-usuario.dto';
import { ChangePasswordDto } from './dto/changePass.dto';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assuming you have this guard

@Controller('users')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) createUsuarioDto: CreateUsuarioDto) {
    try {
      return await this.usuariosService.create(createUsuarioDto);
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  //@UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      return await this.usuariosService.findAll();
    } catch (error) {
      throw new HttpException('Error fetching users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  //@UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usuariosService.findOne(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('Error fetching user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  //@UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUsuarioDto: updateUsuarioDto
  ) {
    try {
      const updatedUser = await this.usuariosService.update(id, updateUsuarioDto);
      if (!updatedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return updatedUser;
    } catch (error) {
      throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  //@UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.usuariosService.remove(id);
    } catch (error) {
      throw new HttpException('Error deleting user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/findByEmail/:email')
 //@UseGuards(JwtAuthGuard)
  async findByEmail(@Param('email') email: string) {
    try {
      const user = await this.usuariosService.findByEmail(email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('Error fetching user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/authorize/:email')
  async authorize(@Param('email') email: string) {
    try {
      return await this.usuariosService.authorize(email);
    } catch (error) {
      throw new UnauthorizedException('Authorization failed');
    }
  }

  @Patch('change-password/:id')
  //@UseGuards(JwtAuthGuard)
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto
  ) {
    try {
      await this.usuariosService.changePassword(id, changePasswordDto.nuevaContrasena);
      return { message: 'Password changed successfully' };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new HttpException('Error changing password', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}