import ToolCard from "@/components/ToolCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface Tool {
  id: string;
  name: string;
  short_description: string;
  category: string;
  pricing_type: string;
  image_url: string;
  website_url: string;
  is_verified: boolean;
}

interface ToolsGridProps {
  tools: Tool[];
  isLoading: boolean;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const ToolsGrid = ({ tools, isLoading, sortBy, onSortChange }: ToolsGridProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{tools.length}</span> tools found
        </p>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px] border-border">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="name">Name (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {tools.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-secondary/50 py-16">
          <p className="text-lg font-medium text-foreground">No tools found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool, index) => (
            <div
              key={tool.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ToolCard
                id={tool.id}
                name={tool.name}
                shortDescription={tool.short_description}
                category={tool.category}
                pricingType={tool.pricing_type}
                imageUrl={tool.image_url}
                websiteUrl={tool.website_url}
                isVerified={tool.is_verified}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolsGrid;
