'use client'

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { checkUsernameExists } from "@/lib/actions/check-username-exist";
import { redirect } from "next/navigation";


export const UsernameForm = () => {
  const [username, setUsername] = useState<string>('')
  const {execute, isExecuting, result} = useAction(checkUsernameExists, ({
    onSuccess: (data) => {
      if (!data) {
        console.log("username unavailable Pleasae choose other username")
      }

      console.log("Username available");
      redirect("/signup");
    },

    onError: (err) => {
      console.log("username selection failed", err)
    }

  }))
  
  return (
    <div>
      <form onSubmit={() => execute({username})}>
        <input type="text" placeholder="username" onChange={(e) => {setUsername(e.target.value)}} />
        {isExecuting ? <div>Wait</div> : null}
        <button type="submit">continue</button>
      </form>
    </div>
  )
}
