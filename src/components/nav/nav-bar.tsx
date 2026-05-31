import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { STACK_AUTH_ENABLED } from "@/stack/config";
import { getCurrentUser } from "@/stack/server";

export default async function NavBar() {
  // getCurrentUser safely returns null when Stack Auth is disabled.
  const user = await getCurrentUser();

  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="font-bold text-xl tracking-tight text-gray-900"
        >
          My App
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-2">
            {STACK_AUTH_ENABLED ? (
              // Auth is configured — show real auth UI
              user ? (
                <NavigationMenuItem>
                  {/* UserButton must be imported dynamically to avoid SDK
                      being evaluated when auth is disabled */}
                  <AuthUserButton />
                </NavigationMenuItem>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Button asChild variant="outline">
                      <Link href="/handler/sign-in">Sign In</Link>
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button asChild>
                      <Link href="/handler/sign-up">Sign Up</Link>
                    </Button>
                  </NavigationMenuItem>
                </>
              )
            ) : (
              // Auth not configured — show placeholder links
              <>
                <NavigationMenuItem>
                  <Button asChild variant="outline" disabled>
                    <span title="Configure Stack Auth to enable sign-in">
                      Sign In
                    </span>
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button asChild disabled>
                    <span title="Configure Stack Auth to enable sign-up">
                      Sign Up
                    </span>
                  </Button>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}

// Isolated component so UserButton import only runs when auth is enabled.
async function AuthUserButton() {
  const { UserButton } = await import("@stackframe/stack");
  return <UserButton />;
}
