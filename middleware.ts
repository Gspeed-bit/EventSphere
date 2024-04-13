import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  //we want to set public router because even if out user is not login they should be able to visit specific route
  publicRoutes: [
    "/",
    "/events/:id",
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/uploadthing",
    "/assets/images/dotted-pattern.png",
  ],
  ignoredRoutes: [
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/uploadthing",
    "/assets/images/logo.svg",

  ],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
