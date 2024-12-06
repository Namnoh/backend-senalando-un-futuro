import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CategoriaProgreso {
    @IsNumber()
    idCategoria: number;

    @IsString()
    nombreCategoria: string;

    @IsNumber()
    progresoCategoria: number;
}

export class PalabraProgreso {
    @IsNumber()
    idPalabra: number;
    
    @IsString()
    nombrePalabra: string;
}

export class ActualizarProgresoDto {
    @IsNotEmpty()
    @IsObject()
    categoriasProgreso: Prisma.JsonValue;

    @IsNotEmpty()
    @IsObject()
    palabrasProgreso: Prisma.JsonValue;

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