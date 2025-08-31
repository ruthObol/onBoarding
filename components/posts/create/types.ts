import { z } from "zod";
import { PostSchema } from "../../../schemas/post-schema";

export type PostSchemaType = z.infer<typeof PostSchema>;
