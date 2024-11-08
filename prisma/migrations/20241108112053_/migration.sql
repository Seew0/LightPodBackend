-- CreateTable
CREATE TABLE "Logs" (
    "LogID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "imageID" TEXT NOT NULL,
    "LaunchTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "TerminateTime" TIMESTAMP(3),
    "Name" TEXT NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("LogID")
);

-- CreateTable
CREATE TABLE "User" (
    "UserID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "apikey" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Admin" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "Logs_LogID_key" ON "Logs"("LogID");

-- CreateIndex
CREATE UNIQUE INDEX "User_UserID_key" ON "User"("UserID");

-- CreateIndex
CREATE UNIQUE INDEX "User_apikey_key" ON "User"("apikey");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;
