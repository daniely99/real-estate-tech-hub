import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const HeroSection = ({ searchQuery, onSearchChange }: HeroSectionProps) => {
  return (
    <section className="border-b border-border bg-background py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="animate-fade-in text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            The Definitive Source for{" "}
            <span className="text-gold">Real Estate Technology</span>
          </h1>
          <p className="mt-6 animate-fade-in text-lg text-muted-foreground md:text-xl" style={{ animationDelay: "0.1s" }}>
            Curated tools for agents, brokers, and investors to close deals faster.
          </p>

          <div className="relative mx-auto mt-10 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for CRMs, lead gen, staging tools..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-14 rounded-xl border-border bg-background pl-12 pr-4 text-base shadow-card transition-shadow duration-200 placeholder:text-muted-foreground focus:shadow-card-hover focus-visible:ring-gold"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Popular:</span>
            {["CRM", "Virtual Staging", "Lead Generation"].map((term) => (
              <button
                key={term}
                onClick={() => onSearchChange(term)}
                className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground transition-colors hover:bg-surface-hover"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
