
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Palabra } from 'src/palabras/entities/palabra.entity';

class CategoriaProgreso {
    @IsNumber()
    idCategoria: number;

    @IsString()
    nombreCategoria: string;

    @IsNumber()
    progresoCategoria: number;
}

class PalabraProgreso {
    @IsNumber()
    idPalabra: number;
    
    @IsString()
    nombrePalabra: string;
}

export class CrearProgresoDto {
    @IsNotEmpty()
    @IsObject()
    categoriasProgreso: {[key:string]:CategoriaProgreso}; // JSON string

    @IsNotEmpty()
    @IsObject()
    palabrasProgreso: {[key:string]:PalabraProgreso}; // JSON string

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