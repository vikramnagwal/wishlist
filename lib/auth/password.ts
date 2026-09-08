import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string) {
    return await hash(password, 10);
}

export async function verifyPassword({ password, hashPassword }: {password: string, hashPassword: string}) {
    return await compare(password, hashPassword);
}
