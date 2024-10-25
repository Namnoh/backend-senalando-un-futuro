import { Categoria } from "@prisma/client";

export type CreateCategoriaDto = Omit<Categoria, 'idCategoria'>