import { NextResponse } from 'next/server';

export function middleware(req) {
 
  const session = req.cookies.get('session-id')?.value;


  const protectedPaths = ['/dashboard', '/Dashboard'];

  const currentPath = new URL(req.url).pathname;
  console.log("session in middle",session)
  if (protectedPaths.includes(currentPath)) {
    if (!session ) {//neeeed to add anouther condition for more security later
      return NextResponse.redirect(new URL('/Login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/Dashboard'],
};
