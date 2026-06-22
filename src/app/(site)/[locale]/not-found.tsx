import { Home, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-8">
          <div className="relative mb-6">
            <Search className="h-16 w-16 mx-auto text-muted-foreground" />
            <X className="h-8 w-8 absolute -top-1 -right-1 text-destructive" />
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t("code")}
          </h1>

          <h2 className="text-xl font-semibold text-foreground mb-4">
            {t("title")}
          </h2>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            {t("description")}
          </p>

          <Link href="/">
            <Button className="w-full" size="lg">
              <Home className="h-4 w-4 mr-2" />
              {t("backHome")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
