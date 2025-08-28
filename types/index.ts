import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
  content: z.string().min(1, "Content is required").max(5000, "Content must be less than 5000 characters"),
  legoModelNumber: z.string().min(1, "Lego model number is required").regex(/^\d+$/, "Must be a valid number"),
  pieces: z.string().nullable().optional().transform((val) => val ? parseInt(val) : null),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  contactPhone: z.string().min(1, "Contact phone is required").regex(/^\d+$/, "Must be a valid phone number"),
  buildDifficulty: z.enum(["EASY", "MEDIUM", "HARD", "EXPERT"] as const),
  publisher: z.string().min(1, "Publisher is required"),
  categoryIds: z.array(z.number())
});

export type PostSchemaType = z.infer<typeof PostSchema>;


export interface LayoutProps {
  children: React.ReactNode;
  home?: boolean;
}
