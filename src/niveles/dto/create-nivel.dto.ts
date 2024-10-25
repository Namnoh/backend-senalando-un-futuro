import { IsNotEmpty, IsString } from 'class-validator';

export class CrearNivelDto {
    @IsNotEmpty()
    @IsString()
    nombreNivel: string;

    @IsNotEmpty()
    @IsString()
    descripcionNivel: string;

    @IsNotEmpty()
    @IsString()
    iconoNivel: string;
}

