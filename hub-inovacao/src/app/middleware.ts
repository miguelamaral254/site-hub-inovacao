import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token'); 

  if (token && (pathname === '/login' || pathname === '/cadastro')) {
    return NextResponse.redirect(new URL('/', request.url)); // Redireciona para home
  }

  if (!token && (pathname === '/area-usuario' || pathname === '/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url)); // Redireciona para login
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ['/login', '/cadastro', '/area-usuario', '/dashboard'], // Adicione as rotas que deseja proteger
};