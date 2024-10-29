import {Controller,Get,Post,Body,Patch,Param,Delete,HttpException,HttpStatus,UseGuards,HttpCode,UnauthorizedException,ForbiddenException, ParseIntPipe} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { updateUsuarioDto } from './dto/update-usuario.dto';
import { ChangePasswordDto } from './dto/changePass.dto';


@Controller('users')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
  ) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: updateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
  @Get('/findByEmail/:email')
  findByEmail(@Param('email') email: string) {
    return this.usuariosService.findByEmail(email);
  }
  @Get('/authorize/:email')
  authorize(@Param('email') email: string) {
    return this.usuariosService.authorize(email);
  }
  @Patch('change-password/:id')
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body('nuevaContrasena') nuevaContrasena: string,
  ) {
    return this.usuariosService.changePassword(id, nuevaContrasena);
  }
}
