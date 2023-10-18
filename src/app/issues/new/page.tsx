"use client";

import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { zodResolver } from "@hookform/resolvers/zod";
import NewIssueSchema, { IssueSchemaType } from "@/lib/issueSchema";
import { AddNewIssue } from "@/serverAction/AddNewIssue";
import { useRouter } from "next/navigation";

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IssueSchemaType>({
    resolver: zodResolver(NewIssueSchema),
  });

  const onSubmit: SubmitHandler<IssueSchemaType> = async (data) => {
    const result = await AddNewIssue(data);
    if (!result) {
      console.log("Error in AddNewIssue");
    }
    if (result.error) {
      console.log(result.error);
      return;
    }
    reset();

    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-3"
    >
      <TextField.Root>
        <TextField.Input placeholder="Issue Title" {...register("title")} />
      </TextField.Root>
      {errors.title?.message && (
        <p className="text-red-500">{errors.title.message}</p>
      )}
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Issue Description" {...field} />
        )}
      />
      {errors.content?.message && (
        <p className="text-red-500">{errors.content.message}</p>
      )}
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
