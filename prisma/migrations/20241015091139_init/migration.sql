-- CreateEnum
CREATE TYPE "Plans" AS ENUM ('STANDARD', 'PRO', 'ULTIMATE');

-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'LAWYER', 'CLIENT');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fullname" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stripeId" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'CLIENT',
    "deletedAt" TIMESTAMP(6),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "caseId" UUID,
    "documentId" UUID,
    "lawyerId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lawyerId" UUID,
    "clientId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chatRoomId" UUID,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LawFirm" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LawFirm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "caseId" UUID,
    "userId" UUID NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "status" "ScheduleStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" UUID,
    "caseId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatRoom" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "caseId" UUID,

    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "message" TEXT NOT NULL,
    "senderId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chatRoomId" UUID NOT NULL,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(3) NOT NULL,
    "slot" TEXT NOT NULL,
    "caseId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" UUID NOT NULL,
    "lawyerId" UUID NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "plan" "Plans" NOT NULL DEFAULT 'STANDARD',
    "credits" INTEGER NOT NULL DEFAULT 10,
    "userId" UUID,

    CONSTRAINT "Billings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpDesk" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "caseId" UUID,

    CONSTRAINT "HelpDesk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilterQuestions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "question" TEXT NOT NULL,
    "answered" TEXT,
    "caseId" UUID,

    CONSTRAINT "FilterQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "users" TEXT[],
    "template" TEXT,
    "userId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LawFirmCases" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_LawFirmLawyers" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_UserChatRooms" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_CampaignToCase" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE INDEX "User_clerkId_idx" ON "User"("clerkId");

-- CreateIndex
CREATE INDEX "Bookmark_userId_idx" ON "Bookmark"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Case_chatRoomId_key" ON "Case"("chatRoomId");

-- CreateIndex
CREATE INDEX "Case_lawyerId_idx" ON "Case"("lawyerId");

-- CreateIndex
CREATE INDEX "Case_clientId_idx" ON "Case"("clientId");

-- CreateIndex
CREATE INDEX "Schedule_caseId_idx" ON "Schedule"("caseId");

-- CreateIndex
CREATE INDEX "Schedule_userId_idx" ON "Schedule"("userId");

-- CreateIndex
CREATE INDEX "Document_userId_idx" ON "Document"("userId");

-- CreateIndex
CREATE INDEX "Document_caseId_idx" ON "Document"("caseId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatRoom_caseId_key" ON "ChatRoom"("caseId");

-- CreateIndex
CREATE INDEX "ChatRoom_caseId_idx" ON "ChatRoom"("caseId");

-- CreateIndex
CREATE INDEX "ChatMessage_senderId_idx" ON "ChatMessage"("senderId");

-- CreateIndex
CREATE INDEX "ChatMessage_chatRoomId_idx" ON "ChatMessage"("chatRoomId");

-- CreateIndex
CREATE INDEX "Bookings_clientId_idx" ON "Bookings"("clientId");

-- CreateIndex
CREATE INDEX "Bookings_lawyerId_idx" ON "Bookings"("lawyerId");

-- CreateIndex
CREATE UNIQUE INDEX "Billings_userId_key" ON "Billings"("userId");

-- CreateIndex
CREATE INDEX "Billings_userId_idx" ON "Billings"("userId");

-- CreateIndex
CREATE INDEX "HelpDesk_caseId_idx" ON "HelpDesk"("caseId");

-- CreateIndex
CREATE INDEX "FilterQuestions_caseId_idx" ON "FilterQuestions"("caseId");

-- CreateIndex
CREATE INDEX "Campaign_userId_idx" ON "Campaign"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_LawFirmCases_AB_unique" ON "_LawFirmCases"("A", "B");

-- CreateIndex
CREATE INDEX "_LawFirmCases_B_index" ON "_LawFirmCases"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LawFirmLawyers_AB_unique" ON "_LawFirmLawyers"("A", "B");

-- CreateIndex
CREATE INDEX "_LawFirmLawyers_B_index" ON "_LawFirmLawyers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserChatRooms_AB_unique" ON "_UserChatRooms"("A", "B");

-- CreateIndex
CREATE INDEX "_UserChatRooms_B_index" ON "_UserChatRooms"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CampaignToCase_AB_unique" ON "_CampaignToCase"("A", "B");

-- CreateIndex
CREATE INDEX "_CampaignToCase_B_index" ON "_CampaignToCase"("B");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoom" ADD CONSTRAINT "ChatRoom_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billings" ADD CONSTRAINT "Billings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpDesk" ADD CONSTRAINT "HelpDesk_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterQuestions" ADD CONSTRAINT "FilterQuestions_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LawFirmCases" ADD CONSTRAINT "_LawFirmCases_A_fkey" FOREIGN KEY ("A") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LawFirmCases" ADD CONSTRAINT "_LawFirmCases_B_fkey" FOREIGN KEY ("B") REFERENCES "LawFirm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LawFirmLawyers" ADD CONSTRAINT "_LawFirmLawyers_A_fkey" FOREIGN KEY ("A") REFERENCES "LawFirm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LawFirmLawyers" ADD CONSTRAINT "_LawFirmLawyers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserChatRooms" ADD CONSTRAINT "_UserChatRooms_A_fkey" FOREIGN KEY ("A") REFERENCES "ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserChatRooms" ADD CONSTRAINT "_UserChatRooms_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToCase" ADD CONSTRAINT "_CampaignToCase_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToCase" ADD CONSTRAINT "_CampaignToCase_B_fkey" FOREIGN KEY ("B") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;
