import { z } from "zod";
import { BuildDifficulty } from "@prisma/client";

export const PostSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
    content: z.string().min(1, "Content is required").max(5000, "Content must be less than 5000 characters"),
    legoModelNumber: z.string().min(1, "Lego model number is required").regex(/^\d+$/, "Must be a valid number"),
    pieces: z.number().nullable().optional(),
    imageUrl: z.string().min(1, "Image URL is required"),
    contactPhone: z.string().min(1, "Contact phone is required").regex(/^\d+$/, "Must be a valid phone number"),
    buildDifficulty: z.nativeEnum(BuildDifficulty),
    publisher: z.string().min(1, "Publisher is required"),
    categoryIds: z.array(z.number()).optional()
  });

  export const CreatePostRequestSchema = z.object({body: PostSchema});