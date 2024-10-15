-- AddForeignKey
ALTER TABLE "Palabra" ADD CONSTRAINT "Palabra_idNivel_fkey" FOREIGN KEY ("idNivel") REFERENCES "Nivel"("idNivel") ON DELETE RESTRICT ON UPDATE CASCADE;
