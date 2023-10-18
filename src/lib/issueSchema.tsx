import * as z from "zod";

const NewIssueSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title must be less than 50 characters long"),
  content: z
    .string()
    .trim()
    .min(4, "Content must be at least 4 characters long")
    .max(500, "Content must be less than 500 characters long"),
});

export default NewIssueSchema;
export type IssueSchemaType = z.infer<typeof NewIssueSchema>;
