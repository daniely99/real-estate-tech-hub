import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-foreground">
              The Real Estate Directory
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <a
            href="/#tools"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Browse Tools
          </a>
          <Button variant="gold" size="default" asChild>
            <Link to="/submit">
              <Plus className="h-4 w-4" />
              Submit a Tool
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
