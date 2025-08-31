-- DropForeignKey
ALTER TABLE "public"."PostCategory" DROP CONSTRAINT "PostCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostCategory" DROP CONSTRAINT "PostCategory_postId_fkey";

-- CreateIndex
CREATE INDEX "PostCategory_postId_idx" ON "public"."PostCategory"("postId");

-- CreateIndex
CREATE INDEX "PostCategory_categoryId_idx" ON "public"."PostCategory"("categoryId");

-- AddForeignKey
ALTER TABLE "public"."PostCategory" ADD CONSTRAINT "PostCategory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PostCategory" ADD CONSTRAINT "PostCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
