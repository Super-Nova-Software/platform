-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "icon" TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
