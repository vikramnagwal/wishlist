"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { actionClient } from "./safe-action";

const checkIfUsernameExistSchema = z.object({
    username: z.string()
});

export const checkUsernameExists = actionClient
    .inputSchema(checkIfUsernameExistSchema)
    .action( async ({ parsedInput }) => {
        const { username } = parsedInput

       const existingUsername = await prisma.user.findUnique({
            where: { username: username}
        })
        
        // return false if it does not exist and true if it exists
        if (!existingUsername) {
            return false
        }
        // true means it exists
        return true
    })