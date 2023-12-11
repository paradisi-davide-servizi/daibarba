import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user)
        return NextResponse.redirect(new URL('/signin', req.url))
    return res;
}

export const config = {
    matcher: '/admin(.*)',
}