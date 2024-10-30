import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';
import { UsuariosService } from '../usuarios/usuarios.service';
 

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;

  constructor( private readonly usuariosService: UsuariosService) {
    
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, 
      secure: false, 
      auth: {
        user: process.env.SMTP_GMAIL_USER, 
        pass: process.env.SMTP_GMAIL_PASS, 
      },
    });
  }
  
  async resetPassword(email: string) {
    const user = await this.usuariosService.findByEmail(email) 
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const token = jwt.sign({ email: user.correoUsuario },process.env.SECRETO_SUPER_SEGURO, { expiresIn: '1h' });
    const resetLink = `http://localhost:3000/resetPassword?token=${token}`;

    // Envía el enlace de restablecimiento de contraseña al usuario
    await this.transporter.sendMail({
      from: 'suf.proyect@gmail.com',
      to: email,
      subject: 'Restablecimiento de contraseña',
      text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetLink}`,
    });
  }

}
