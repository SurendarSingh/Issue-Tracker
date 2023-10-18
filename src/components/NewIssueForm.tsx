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
import toast from "react-hot-toast";
import getErrorMessage from "@/lib/getErrorMessage";
import ErrorMessage from "./ErrorMessage";

const NewIssueForm = () => {
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
    reset();
    const result = await AddNewIssue(data);
    if (!result) {
      toast.error("Error in System!");
    } else if (result.error) {
      toast.error(getErrorMessage(result.error));
    } else {
      toast.success("Issue Successfully created!");
      router.push("/issues");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-3"
    >
      <TextField.Root>
        <TextField.Input placeholder="Issue Title" {...register("title")} />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Issue Description" {...field} />
        )}
      />
      <ErrorMessage>{errors.content?.message}</ErrorMessage>
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssueForm;
