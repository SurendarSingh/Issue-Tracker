"use client";

import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface NewIssueForm {
  title: string;
  content: string;
}

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewIssueForm>();

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-3"
    >
      <TextField.Root>
        <TextField.Input
          placeholder="Issue Title"
          {...register("title", { required: true })}
        />
      </TextField.Root>
      {errors.title && <p className="text-red-500">Title is required</p>}
      <Controller
        name="content"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <SimpleMDE placeholder="Issue Description" {...field} />
        )}
      />
      {errors.content && (
        <p className="text-red-500">Description is required</p>
      )}
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
