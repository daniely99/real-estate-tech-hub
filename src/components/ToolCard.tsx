import { BadgeCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  id: string;
  name: string;
  shortDescription: string;
  category: string;
  pricingType: string;
  imageUrl: string;
  websiteUrl: string;
  isVerified: boolean;
}

const categoryLabels: Record<string, string> = {
  crm: "CRM",
  "lead-generation": "Lead Generation",
  "virtual-staging": "Virtual Staging",
  "marketing-automation": "Marketing Automation",
  analytics: "Analytics",
};

const ToolCard = ({
  name,
  shortDescription,
  category,
  pricingType,
  imageUrl,
  websiteUrl,
  isVerified,
}: ToolCardProps) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
        <img
          src={imageUrl}
          alt={`${name} screenshot`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-card-foreground">{name}</h3>
          {isVerified && (
            <BadgeCheck className="h-5 w-5 text-gold" aria-label="Verified tool" />
          )}
        </div>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            {categoryLabels[category] || category}
          </Badge>
          <Badge variant="outline" className="border-border text-muted-foreground">
            {pricingType}
          </Badge>
        </div>

        <Button
          variant="secondary"
          className="mt-4 w-full"
          asChild
        >
          <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
            View Details & Website
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </article>
  );
};

export default ToolCard;
