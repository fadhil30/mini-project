import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function verifyJwtToken(token: string) {
    try {
        const verifiedToken = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
        return verifiedToken.payload;
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;
    if (!accessToken) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const verifiedToken = await verifyJwtToken(accessToken);
    if (!verifiedToken) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const { pathname } = request.nextUrl;
    const role = verifiedToken.role;

    if (pathname.startsWith("/dashboard/promotor")) {
        if (role !== "PROMOTOR") {
            return NextResponse.redirect(new URL("/not-found", request.url));
        }
    } else if (pathname.startsWith("/dashboard/user")) {
        if (role !== "USER") {
            return NextResponse.redirect(new URL("/not-found", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
