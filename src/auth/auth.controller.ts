import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsString, MinLength } from 'class-validator';

class ResetPasswordRequestDto {
  @IsEmail()
  email: string;
}

class ResetPasswordDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('reset-password-request')
  @HttpCode(HttpStatus.OK)
  async resetPasswordRequest(@Body() body: ResetPasswordRequestDto) {
    await this.authService.resetPassword(body.email);
    return { message: 'Si el correo existe, se ha enviado un enlace de restablecimiento.' };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() body: ResetPasswordDto) {
    try {
      const email = await this.authService.verifyResetToken(body.token);
      await this.authService.updatePassword(email, body.newPassword);
      return { message: 'Contraseña actualizada con éxito' };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Token inválido o expirado');
      }
      throw error;
    }
  }
}