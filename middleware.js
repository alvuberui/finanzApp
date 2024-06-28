// src/middleware.ts

import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/' || path === '/register'

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/home', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }  
}

// It specifies the paths for which this middleware should be executed. 
export const config = {
  matcher: [
    '/',
    '/home',
    '/register',
    '/account',
    '/verifyemail',
    '/password',
    '/transaction/create'
  ]
}