import React, { createContext, useContext, useState } from 'react'

interface RegisterContextProps {
  username: string;
  steps: "username" | "signup";
  setUsername: (username: string) => void;
  setSteps: (step: "username" | "signup") => void;
}

const RegisterContext = createContext<RegisterContextProps | "undefined">("undefined");


export const RegisterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [username, setUsername] = useState("")
    const [steps, setSteps] = useState<"username" | "signup">("username")

    return (
        <RegisterContext.Provider value={{username, steps, setUsername, setSteps}}>
            {children}
        </RegisterContext.Provider>
    )
}

export function useRegisterContext() {
    const context = useContext(RegisterContext);

    if(context === "undefined") {
        throw new Error(
            "useRegisterContext must be used under RegisterProvider."
        )
    }

    return context;
}