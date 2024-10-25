-- CreateTable
CREATE TABLE "Palabra" (
    "idPalabra" SERIAL NOT NULL,
    "nombrePalabra" TEXT NOT NULL,
    "nivelPalabra" INTEGER NOT NULL,
    "categoriaPalabra" TEXT NOT NULL,
    "iconPalabra" TEXT,
    "videoPalabra" TEXT NOT NULL,

    CONSTRAINT "Palabra_pkey" PRIMARY KEY ("idPalabra")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "idUsuario" SERIAL NOT NULL,
    "nombreUsuario" TEXT NOT NULL,
    "apellidoUsuario" TEXT NOT NULL,
    "correoUsuario" TEXT NOT NULL,
    "contrasenaUsuario" TEXT NOT NULL,
    "idRol" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateTable
CREATE TABLE "Rol" (
    "idRol" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("idRol")
);

-- CreateTable
CREATE TABLE "Progreso" (
    "idProgreso" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Progreso_pkey" PRIMARY KEY ("idProgreso")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_idUsuario_key" ON "Usuario"("idUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correoUsuario_key" ON "Usuario"("correoUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Rol_idRol_key" ON "Rol"("idRol");

-- CreateIndex
CREATE UNIQUE INDEX "Progreso_idProgreso_key" ON "Progreso"("idProgreso");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idRol_fkey" FOREIGN KEY ("idRol") REFERENCES "Rol"("idRol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progreso" ADD CONSTRAINT "Progreso_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;
