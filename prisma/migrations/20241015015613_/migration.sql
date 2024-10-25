/*
  Warnings:

  - You are about to drop the column `categoriaPalabra` on the `Palabra` table. All the data in the column will be lost.
  - You are about to drop the column `nivelPalabra` on the `Palabra` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Progreso` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idUsuario]` on the table `Progreso` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idCategoria` to the `Palabra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idNivel` to the `Palabra` table without a default value. This is not possible if the table is not empty.
  - Made the column `iconPalabra` on table `Palabra` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `categoriasProgreso` to the `Progreso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idNivel` to the `Progreso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `palabrasProgreso` to the `Progreso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `porcentajeNivel` to the `Progreso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Palabra" DROP COLUMN "categoriaPalabra",
DROP COLUMN "nivelPalabra",
ADD COLUMN     "idCategoria" INTEGER NOT NULL,
ADD COLUMN     "idNivel" INTEGER NOT NULL,
ALTER COLUMN "iconPalabra" SET NOT NULL;

-- AlterTable
ALTER TABLE "Progreso" DROP COLUMN "descripcion",
ADD COLUMN     "categoriasProgreso" JSONB NOT NULL,
ADD COLUMN     "idNivel" INTEGER NOT NULL,
ADD COLUMN     "palabrasProgreso" JSONB NOT NULL,
ADD COLUMN     "porcentajeNivel" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "createAt",
DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "Categoria" (
    "idCategoria" SERIAL NOT NULL,
    "nombreCategoria" TEXT NOT NULL,
    "descripcionCategoria" TEXT NOT NULL,
    "iconoCategoria" TEXT NOT NULL,
    "bgCategoria" TEXT NOT NULL,
    "idNivel" INTEGER NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("idCategoria")
);

-- CreateTable
CREATE TABLE "Nivel" (
    "idNivel" SERIAL NOT NULL,
    "nombreNivel" TEXT NOT NULL,
    "descripcionNivel" TEXT NOT NULL,
    "iconoNivel" TEXT NOT NULL,

    CONSTRAINT "Nivel_pkey" PRIMARY KEY ("idNivel")
);

-- CreateIndex
CREATE UNIQUE INDEX "Progreso_idUsuario_key" ON "Progreso"("idUsuario");

-- AddForeignKey
ALTER TABLE "Palabra" ADD CONSTRAINT "Palabra_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("idCategoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_idNivel_fkey" FOREIGN KEY ("idNivel") REFERENCES "Nivel"("idNivel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progreso" ADD CONSTRAINT "Progreso_idNivel_fkey" FOREIGN KEY ("idNivel") REFERENCES "Nivel"("idNivel") ON DELETE RESTRICT ON UPDATE CASCADE;
