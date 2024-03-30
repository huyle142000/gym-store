import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
// import { cookieName, fallbackLng, languages } from './utils/i18next'

// acceptLanguage.languages(languages)

export const config = {
    // matcher: '/:lng*'
    matcher: ['/((?!api|_next/static|_next/images|icons|dictionaries|sw.js).*)']
}

const PUBLIC_FILE = /\.(.*)$/;


export function middleware(req: any) {
    if (PUBLIC_FILE.test(req.nextUrl.pathname)) {
        return NextResponse.next();
    }

    return NextResponse.next()
}