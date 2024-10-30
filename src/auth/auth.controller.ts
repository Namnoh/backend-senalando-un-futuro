import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('reset-password')
  async resetPassword(@Body() body: { email: string }) {
    await this.authService.resetPassword(body.email);
    return { message: 'Email de restablecimiento enviado' };
  }
}
