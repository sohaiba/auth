import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let jwt = request.cookies.get("token")?.value;
  console.log("inside middleware with jwt:", jwt)
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
  );

  if (!jwt) {
    const host = request.headers.get("host");
    const loginUrl = `http://${host}/api/auth/login`;
  
    // Check if the current URL is already the login URL to avoid a loop
    if (request.url !== loginUrl) {
      return NextResponse.redirect(loginUrl);
      console.log("not the login page:", request.url)
    }
  } else {
    const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret);
    const headers = new Headers(request.headers);
    headers.set("user", JSON.stringify(payload.email));

    console.log(protectedHeader);
    console.log(payload);
    return NextResponse.next({
      request: {
        headers: headers,
      },
    });
  }
}