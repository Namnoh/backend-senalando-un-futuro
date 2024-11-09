import { IsEmail, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
    @IsString()
    contrasenaActual: string;

    @IsString()
    @MinLength(8, { message: 'La nueva contraseña debe tener al menos 8 caracteres' })
    nuevaContrasena: string;
}