import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/api/auth/session",
];


export default async function middleware(req: NextRequest) {
  const baseUrl = req.nextUrl.origin;
  const pathname = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  try {
    const res = await fetch(`${baseUrl}/api/auth/session`, {
      headers: {
        cookie: req.headers.get('cookie') as string || ''
      }
    })
    const { user } = await res.json();

    if (!user && !publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${pathname}`, req.url))
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(`${baseUrl}/sign-in`);

  }
}

export const config = {
  matcher: [
    "/((?!api/auth/session|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
