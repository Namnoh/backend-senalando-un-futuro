//export class CreateUsuarioDto {}
import { Usuario } from "@prisma/client";
import { type } from "os";

export type CreateUsuarioDto = Omit<Usuario, 'idUsuario' | 'createAt' | 'updatedAt'>