import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/../prisma/client";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255).trim(),
  content: z.string().min(1).trim(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { errors: validation.error.errors },
      { status: 400 }
    );
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: validation.data.title,
      content: validation.data.content,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
