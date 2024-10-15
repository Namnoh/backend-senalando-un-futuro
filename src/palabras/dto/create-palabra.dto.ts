// export class CreatePalabraDto {}
import { Palabra } from "@prisma/client";

export type CreatePalabraDto = Omit<Palabra, 'idPalabra'>