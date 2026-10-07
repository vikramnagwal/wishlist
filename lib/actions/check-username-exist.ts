"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { actionClient } from "./safe-action";
import { cookies } from "next/headers";
import { usernameCookies } from "../constants/cookies";

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

                // false means it exists
        if (existingUsername) {
            return false
        }

        // return true if it does not exist and true if it exists
        const cookieStore = await cookies();
        cookieStore.set(usernameCookies, username)
        return true
    })