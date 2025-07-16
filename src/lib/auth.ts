import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import prisma from "./prisma";
import { cookies } from "next/headers";
import { cache } from "react";
import { Session, User } from "@/generated/prisma";

export const generateSessionToken = (): string => {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
}

export async function setSessionTokenCookie(token: string, expiresAt: Date): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        path: "/"
    });
}

export async function deleteSessionTokenCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set("session", "", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/"
    });
}

//creating session
export const createSession = async (userId: string): Promise<Session> => {
    const token = generateSessionToken();
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session = await prisma.session.create({
        data: {
            id: sessionId,
            userId,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            token
        }
    })
    await setSessionTokenCookie(token, session.expiresAt);
    return session;
}

//validating session
export const validateSessionToken = async (token: string): Promise<SessionValidationResult> => {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

    const result = await prisma.session.findUnique({
        where: {
            id: sessionId
        },
        include: {
            user: true
        },
    });

    if (!result) {
        return { session: null, user: null };
    }

    const { user, ...session } = result;

    if (Date.now() >= session.expiresAt.getTime()) {
        await prisma.session.delete({ where: { id: sessionId } });
        return { session: null, user: null };
    }


    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 7) {
        await prisma.session.update({
            where: {
                id: sessionId
            },
            data: {
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
            }
        })
    }

    return { session, user };
}

//invalidating session
export const invalidateSession = async (sessionId: string) => {
    await prisma.session.delete({ where: { id: sessionId } });
    await deleteSessionTokenCookie();
}

// getting session and user
export const auth = cache(async (): Promise<SessionValidationResult> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value ?? null;
    if (token === null) {
        return { session: null, user: null };
    }
    const result = await validateSessionToken(token);
    return result;
});

export type SessionValidationResult =
    | { session: Session; user: Omit<User, "password"> }
    | { session: null; user: null };