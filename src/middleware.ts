import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  
  // El único origen permitido es la URL del Frontend
  const allowedOrigins = [
    'http://localhost:3000',
    'https://lovecats-frontend.vercel.app'
  ];

  // Respuesta base
  const response = NextResponse.next();

  // Verificación de CORS
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  // Uso de CORS
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

// La ruta en la que debe de actuar el middleware
export const config = {
  matcher: '/api/:path*',
};