'use client'

import { useState } from "react";


export const UsernameForm = () => {
  const [username, setUsername] = useState<string>('')
  return (
    <div>
      <form>
        <input type="text" placeholder="username" onChange={(e) => {setUsername(e.target.value)}} />
        <button type="submit">continue</button>
      </form>
    </div>
  )
}
