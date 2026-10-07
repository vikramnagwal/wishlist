'use client'

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkUsernameExists } from "@/lib/actions/check-username-exist";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
username: z.string().trim().min(3, "Username must be at least 3 characters long").max(40, "Username must be at most 40 characters long").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
})

type FormData = z.infer<typeof formSchema>

export const UsernameForm = () => {
  const router = useRouter();

  const { handleSubmit, register} = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: ''}
  });

  function onSubmit(data: FormData) {
    execute({ username: data.username});
  }

  const {execute, isExecuting} = useAction(checkUsernameExists, ({
    onSuccess: ({ data }) => {
      if (data) {
          toast.success("username available");
          router.push("/signup");
      }
         toast.error("username already exists")
    },

    onError: (err) => {
      console.log("username selection failed", err)
      toast.error("username selection failed")
    }
  }))
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
       <input placeholder="JaneDoe" autoComplete="off" type="text" {...register("username")} />
       <button type="submit" disabled={isExecuting}>
         {isExecuting ? "Checking..." : "Continue"}
       </button>
      </form>
    </div>
  )
}
