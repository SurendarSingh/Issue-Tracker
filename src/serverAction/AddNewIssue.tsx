"use server";

import NewIssueSchema, { IssueSchemaType } from "@/lib/issueSchema";
import prisma from "@/../prisma/client";
import getErrorMessage from "@/lib/getErrorMessage";

export async function AddNewIssue(data: IssueSchemaType) {
  const result = NewIssueSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.format() };
  }

  try {
    const newIssue = await prisma.issue.create({
      data: {
        title: result.data.title,
        content: result.data.content,
      },
    });

    return { success: true, data: newIssue };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
