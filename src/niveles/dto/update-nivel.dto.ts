import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ActualizarNivelDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    nombreNivel?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    descripcionNivel?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    iconoNivel?: string;
}