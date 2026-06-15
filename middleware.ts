export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/lessons/:path*", "/playground/:path*", "/billing/:path*"],
};
