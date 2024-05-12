-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT,
    "password" TEXT,
    "otp_code" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
