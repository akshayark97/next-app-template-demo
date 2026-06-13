import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run the locale middleware on everything EXCEPT:
  //   - /api            (route handlers)
  //   - /handler        (Stack Auth, kept on a fixed non-localized path)
  //   - /_next, /_vercel (framework internals)
  //   - any file with an extension (favicon.ico, images, etc.)
  matcher: ["/((?!api|handler|_next|_vercel|.*\\..*).*)"],
};
