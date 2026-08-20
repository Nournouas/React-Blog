/*
  Warnings:

  - You are about to drop the column `published` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "published",
ADD COLUMN     "pubTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "published",
ADD COLUMN     "pubStatus" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "pubTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
