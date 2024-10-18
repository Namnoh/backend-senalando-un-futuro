import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ActualizarProgresoDto {
    @IsNotEmpty()
    @IsString()
    categoriasProgreso: string; // JSON string

    @IsNotEmpty()
    @IsString()
    palabrasProgreso: string; // JSON string

    @IsNotEmpty()
    @IsNumber()
    porcentajeNivel: number;

    @IsNotEmpty()
    @IsNumber()
    idNivel: number;

    @IsNotEmpty()
    @IsNumber()
    idUsuario: number;
}