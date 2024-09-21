import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// إضافة authRoutes
// const authRoutes = ['/', '/profile(.*)', '/settings(.*)']; // روابط تحتاج للمصادقة

// جمع كل الروابط المتاحة (authRoutes مع الروابط العامة)
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/' , '/product-details(.*)']);

export default clerkMiddleware((auth, request) => {
  // حماية الروابط غير العامة
  if (!isPublicRoute(request)) {
    auth().protect(); // تأكد من المصادقة
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
