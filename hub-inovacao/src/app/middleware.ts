import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar se o token está presente no cookie
  const token = request.cookies.get('token'); 

  // Se o usuário estiver autenticado (token presente) e tentando acessar login ou cadastro, redirecionar para a home
  if (token && (pathname === '/login' || pathname === '/cadastro')) {
    return NextResponse.redirect(new URL('/', request.url)); // Redireciona para home
  }

  // Se não estiver autenticado e tentando acessar páginas protegidas, redireciona para login
  if (!token && (pathname === '/area-usuario' || pathname === '/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url)); // Redireciona para login
  }

  return NextResponse.next(); // Permitir acesso a outras páginas
}

export const config = {
  matcher: ['/login', '/cadastro', '/area-usuario', '/dashboard'], // Adicione as rotas que deseja proteger
};